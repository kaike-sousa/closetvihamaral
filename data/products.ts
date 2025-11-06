    export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    images: string[]
    colors: {
        name: string
        hex: string
        image: string
    }[]
    sizes: string[]
    }

    export const products: Product[] = [
    {
        id: "saia-courino",
        name: "Saia Courino",
        description: `Saia em tecido courino com modelagem moderna e elegante.
    Tamanhos:
    M - Veste do 38 ao 40
    G - Veste 42.
    Tecido: Courino.`,
        price: 85.0,
        category: "saias",
        images: [
        "/saias/saia_courino/saia_courino.jpg",
        "/saias/saia_courino/saia_courino2.jpg",
        ],
        colors: [
        { name: "Preto", hex: "#000000", image: "/saias/saia_courino/saia_courino2.jpg" },
        ],
        sizes: ["M (38-40)", "G (42)"],
    },
    {
        id: "saia-cravo",
        name: "Saia Cravo",
        description: `Saia Cravo em Poliamida de alta qualidade.
    Tamanho Único: veste do 36 ao 42.
    Tecido: Poliamida.`,
        price: 69.99,
        category: "saias",
        images: 
        ["/saias/saia_cravo/saia_cravo_off.jpg",
        "/saias/saia_cravo/saia_cravo_verdementa.jpg",
        "/saias/saia_cravo/saia_cravo_vermelha.jpg",
        "/saias/saia_cravo/saia_cravo_branco.jpg",
        "/saias/saia_cravo/saia_cravo_marrom.jpg"],
        colors: [
        { name: "Off", hex: "#F8F8F8", image: "/saias/saia_cravo/saia_cravo_off.jpg" },
        { name: "Verde Menta", hex: "#98FF98", image: "/saias/saia_cravo/saia_cravo_verdementa.jpg" },
        { name: "Vermelho", hex: "#D32F2F", image: "/saias/saia_cravo/saia_cravo_vermelha.jpg" },
        { name: "Branco", hex: "#FFFFFF", image: "/saias/saia_cravo/saia_cravo_branco.jpg" },
        { name: "Marrom", hex: "#5A3A22", image: "/saias/saia_cravo/saia_cravo_marrom.jpg" },
        ],
        sizes: ["Único (36-42)"],
    },
    {
        id: "saia-tiffany",
        name: "Saia Tiffany",
        description: `Saia Tiffany confeccionada em Poliamida, com toque suave e ótimo caimento.
    Tamanho Único: veste do 36 ao 42.`,
        price: 65.0,
        category: "saias",
        images: [
        "/saias/saia_tiffany/saia_tiffany_off.jpg",
        "/saias/saia_tiffany/saia_tiffany_marrom.jpg",
        "/saias/saia_tiffany/saia_tiffany_cinza.jpg",
        "/saias/saia_tiffany/saia_tiffany_vermelha.jpg",
        ],
        colors: [
        { name: "Off", hex: "#F8F8F8", image: "/saias/saia_tiffany/saia_tiffany_off.jpg" },
        { name: "Marrom", hex: "#5A3A22", image: "/saias/saia_tiffany/saia_tiffany_marrom.jpg" },
        { name: "Cinza", hex: "#BEBEBE", image: "/saias/saia_tiffany/saia_tiffany_cinza.jpg" },
        { name: "Vermelho", hex: "#D32F2F", image: "/saias/saia_tiffany/saia_tiffany_vermelha.jpg" },
        ],
        sizes: ["Único (36-42)"],
    },
    {
        id: "saia-babados",
        name: "Saia Babados",
        description: `Saia em malha Poliamida de qualidade, com babados delicados e modelagem confortável.
    Tamanho Único: veste do 36 ao 42.`,
        price: 89.99,
        category: "saias",
        images: [
        "/saias/saia_babados/saia_babados_bege.jpg",
        "/saias/saia_babados/saia_babados_rosa.jpg",
        ],
        colors: [
        { name: "Bege", hex: "#F5DEB3", image: "/saias/saia_babados/saia_babados_bege.jpg" },
        { name: "Rosa", hex: "#FFC0CB", image: "/saias/saia_babados/saia_babados_rosa.jpg" },
        ],
        sizes: ["Único (36-42)"],
    },
    {
        id: "saia-fshow",
        name: "Saia Fshow",
        description: `Saia Fshow em malha Poliamida de qualidade, confortável e elegante.
    Tamanho Único: veste do 36 ao 42.`,
        price: 65.0,
        category: "saias",
        images: [
        "/saias/saia_fshow/saia_fshow_preto.jpg",
        "/saias/saia_fshow/saia_fshow_vinho.jpg",
        "/saias/saia_fshow/saia_fshow_rosabebe.jpg",
        "/saias/saia_fshow/saia_fshow_cinza.jpg",
        ],
        colors: [
        { name: "Preto", hex: "#000000", image: "/saias/saia_fshow/saia_fshow_preto.jpg" },
        { name: "Vinho", hex: "#722F37", image: "/saias/saia_fshow/saia_fshow_vinho.jpg" },
        { name: "Rosa Bebê", hex: "#F4A6C4", image: "/saias/saia_fshow/saia_fshow_rosabebe.jpg" },
        { name: "Cinza", hex: "#BEBEBE", image: "/saias/saia_fshow/saia_fshow_cinza.jpg" },
        ],
        sizes: ["Único (36-42)"],
    },
    {
        id: "saia-lua",
        name: "Saia Lua",
        description: `Saia Lua em tecido Suplex (92% poliéster, 8% elastano).
    Tamanho Único: serve do 36 ao 40.`,
        price: 59.99,
        category: "saias",
        images: [
        "/saias/saia_lua/saia_lua_branca.jpg",
        "/saias/saia_lua/saia_lua_marrom.jpg",
        "/saias/saia_lua/saia_lua_rosa.jpg",
        "/saias/saia_lua/saia_lua_marsala.jpg",
        ],
        colors: [
        { name: "Branca", hex: "#FFFFFF", image: "/saias/saia_lua/saia_lua_branca.jpg" },
        { name: "Marrom", hex: "#5A3A22", image: "/saias/saia_lua/saia_lua_marrom.jpg" },
        { name: "Rosa", hex: "#FFC0CB", image: "/saias/saia_lua/saia_lua_rosa.jpg" },
        { name: "Marsala", hex: "#800000", image: "/saias/saia_lua/saia_lua_marsala.jpg" },
        ],
        sizes: ["Único (36-40)"],
    },
    {
        id: "saia-ilhos",
        name: "Saia Ilhós",
        description: `Saia Ilhós confeccionada em Poliamida (90% poliamida, 10% elastano).
    Tamanho Único: serve do 36 ao 40.`,
        price: 59.99,
        category: "saias",
        images: [
        "/saias/saia_ilhos/saia_ilhos_preta.jpg",
        "/saias/saia_ilhos/saia_ilhos_marrom.jpg",
        "/saias/saia_ilhos/saia_ilhos_cinza.jpg",
        ],
        colors: [
        { name: "Preto", hex: "#000000", image: "/saias/saia_ilhos/saia_ilhos_preta.jpg" },
        { name: "Marrom", hex: "#5A3A22", image: "/saias/saia_ilhos/saia_ilhos_marrom.jpg" },
        { name: "Cinza", hex: "#BEBEBE", image: "/saias/saia_ilhos/saia_ilhos_cinza.jpg" },
        ],
        sizes: ["Único (36-40)"],
    },
    {
        id: "mini-saia",
        name: "Mini Saia",
        description: `Mini saia em Poliamida (90% poliamida, 10% elastano).
    Tamanho Único: serve do 36 ao 40.`,
        price: 55.0,
        category: "saias",
        images: [
        "/saias/mini_saia/mini_saia_off.jpg",
        "/saias/mini_saia/mini_saia_amarelomanteiga.jpg",
        "/saias/mini_saia/mini_saia_rosabebe.jpg",
        "/saias/mini_saia/mini_saia_cinza.jpg",
        "/saias/mini_saia/mini_saia_marrom.jpg",
        ],
        colors: [
        { name: "Off", hex: "#F8F8F8", image: "/saias/mini_saia/mini_saia_off.jpg" },
        { name: "Amarelo Manteiga", hex: "#FFFDD0", image: "/saias/mini_saia/mini_saia_amarelomanteiga.jpg" },
        { name: "Rosa Bebê", hex: "#F4A6C4", image: "/saias/mini_saia/mini_saia_rosabebe.jpg" },
        { name: "Cinza", hex: "#BEBEBE", image: "/saias/mini_saia/mini_saia_cinza.jpg" },
        { name: "Marrom", hex: "#5A3A22", image: "/saias/mini_saia/mini_saia_marrom.jpg" },
        ],
        sizes: ["Único (36-40)"],
    },
    ]
