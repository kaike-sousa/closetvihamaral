-- =============================================
-- BELLA MODA - Schema Supabase
-- =============================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABELA: categories (Categorias)
-- =============================================
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir categorias padrão
INSERT INTO categories (slug, name) VALUES
    ('saias', 'Saias'),
    ('conjuntos', 'Conjuntos'),
    ('vestidos', 'Vestidos'),
    ('cropped', 'Cropped'),
    ('bodys', 'Bodys'),
    ('calcas', 'Calças');

-- =============================================
-- TABELA: products (Produtos)
-- =============================================
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sizes TEXT[] DEFAULT '{}', -- Array de tamanhos: {'PP', 'P', 'M', 'G', 'GG'}
    featured BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: product_colors (Cores do Produto)
-- Cada cor pode ter múltiplas imagens
-- =============================================
CREATE TABLE product_colors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color_name VARCHAR(50) NOT NULL, -- Ex: 'Preto', 'Branco', 'Rosa'
    color_hex VARCHAR(7) NOT NULL, -- Ex: '#1a1a1a'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, color_name)
);

-- =============================================
-- TABELA: product_images (Imagens do Produto)
-- Cada imagem está associada a uma cor específica
-- =============================================
CREATE TABLE product_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_color_id UUID NOT NULL REFERENCES product_colors(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: customers (Clientes)
-- =============================================
CREATE TABLE customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: orders (Pedidos)
-- =============================================
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number SERIAL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'processando', 'enviado', 'entregue', 'cancelado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: order_items (Itens do Pedido)
-- =============================================
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL, -- Salvar nome para histórico
    product_price DECIMAL(10, 2) NOT NULL, -- Salvar preço para histórico
    quantity INTEGER NOT NULL DEFAULT 1,
    size VARCHAR(10),
    color VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TABELA: admin_users (Usuários Admin)
-- =============================================
CREATE TABLE admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Use bcrypt no backend
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- TABELA: store_settings (Configurações da Loja)
-- =============================================
CREATE TABLE store_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir configurações padrão
INSERT INTO store_settings (key, value) VALUES
    ('store_name', 'Bella Moda'),
    ('store_email', 'contato@bellamoda.com'),
    ('store_phone', '(11) 99999-0000'),
    ('store_address', 'Rua das Flores, 123 - São Paulo, SP'),
    ('instagram', '@bellamoda'),
    ('whatsapp', '5511999990000');

-- =============================================
-- ÍNDICES para melhor performance
-- =============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_products_active ON products(active) WHERE active = TRUE;
CREATE INDEX idx_product_colors_product ON product_colors(product_id);
CREATE INDEX idx_product_images_color ON product_images(product_color_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- =============================================
-- FUNÇÃO: Atualizar updated_at automaticamente
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- VIEW: Produtos com detalhes (cores e imagens)
-- =============================================
CREATE OR REPLACE VIEW products_with_details AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.sizes,
    p.featured,
    p.active,
    p.created_at,
    c.slug as category_slug,
    c.name as category_name,
    COALESCE(
        json_agg(
            DISTINCT jsonb_build_object(
                'id', pc.id,
                'name', pc.color_name,
                'hex', pc.color_hex,
                'images', (
                    SELECT COALESCE(json_agg(
                        jsonb_build_object(
                            'id', pi.id,
                            'url', pi.image_url,
                            'is_primary', pi.is_primary
                        ) ORDER BY pi.display_order
                    ), '[]'::json)
                    FROM product_images pi 
                    WHERE pi.product_color_id = pc.id
                )
            )
        ) FILTER (WHERE pc.id IS NOT NULL),
        '[]'::json
    ) as colors
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_colors pc ON p.id = pc.product_id
WHERE p.active = TRUE
GROUP BY p.id, c.slug, c.name;

-- =============================================
-- STORAGE BUCKET (execute no Supabase Dashboard)
-- =============================================
-- No painel do Supabase, vá em Storage e crie um bucket chamado 'product-images'
-- Configurações recomendadas:
-- - Public bucket: TRUE (para imagens públicas)
-- - File size limit: 5MB
-- - Allowed mime types: image/jpeg, image/png, image/webp

-- =============================================
-- RLS (Row Level Security) - Políticas de Segurança
-- =============================================

-- Habilitar RLS nas tabelas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública para produtos (qualquer um pode ver)
CREATE POLICY "Produtos são públicos para leitura" ON products
    FOR SELECT USING (active = TRUE);

CREATE POLICY "Cores de produtos são públicas" ON product_colors
    FOR SELECT USING (TRUE);

CREATE POLICY "Imagens de produtos são públicas" ON product_images
    FOR SELECT USING (TRUE);

CREATE POLICY "Categorias são públicas" ON categories
    FOR SELECT USING (TRUE);

-- Políticas de admin (requer autenticação - ajuste conforme seu sistema de auth)
-- Para operações de escrita, você precisará configurar conforme sua autenticação

-- =============================================
-- EXEMPLO DE INSERÇÃO DE PRODUTO COMPLETO
-- =============================================
/*
-- 1. Inserir produto
INSERT INTO products (name, description, price, category_id, sizes, featured)
VALUES (
    'Vestido Midi Elegante',
    'Vestido midi com corte elegante, perfeito para ocasiões especiais.',
    289.90,
    (SELECT id FROM categories WHERE slug = 'vestidos'),
    ARRAY['P', 'M', 'G'],
    TRUE
) RETURNING id;

-- 2. Inserir cores (usando o ID do produto retornado)
INSERT INTO product_colors (product_id, color_name, color_hex, display_order)
VALUES 
    ('PRODUCT_ID_AQUI', 'Preto', '#1a1a1a', 0),
    ('PRODUCT_ID_AQUI', 'Bege', '#d4c4a8', 1);

-- 3. Inserir imagens para cada cor
INSERT INTO product_images (product_color_id, image_url, display_order, is_primary)
VALUES 
    ('COLOR_ID_PRETO', 'https://seu-bucket.supabase.co/storage/v1/object/public/product-images/vestido-preto-1.jpg', 0, TRUE),
    ('COLOR_ID_PRETO', 'https://seu-bucket.supabase.co/storage/v1/object/public/product-images/vestido-preto-2.jpg', 1, FALSE),
    ('COLOR_ID_BEGE', 'https://seu-bucket.supabase.co/storage/v1/object/public/product-images/vestido-bege-1.jpg', 0, TRUE);
*/
