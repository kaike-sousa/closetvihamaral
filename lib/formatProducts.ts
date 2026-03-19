    export function formatProduct(product: any) {
    const COLOR_MAP: Record<string, string> = {
        preto: '#000000',
        branco: '#ffffff',
        rosa: '#f472b6',
        vermelho: '#ef4444',
        azul: '#3b82f6',
        verde: '#22c55e',
        amarelo: '#eab308',
        bege: '#d6bfa9',
        marrom: '#7c2d12',
        cinza: '#6b7280'
    }

    const colorsMap: Record<
        string,
        { name: string; hex: string; images: string[] }
    > = {}

    product.produto_imagens?.forEach((img: any) => {
        const colorName = img.color?.toLowerCase()

        if (!colorsMap[colorName]) {
        colorsMap[colorName] = {
            name: img.color,
            hex: COLOR_MAP[colorName] || '#ccc',
            images: []
        }
        }

        if (!colorsMap[colorName].images.includes(img.image_url)) {
        colorsMap[colorName].images.push(img.image_url)
        }
    })

    const colors = Object.values(colorsMap)

    const sizes = [
        ...new Set(product.produto_variantes?.map((v: any) => v.size))
    ]

    return {
        ...product,
        colors,
        sizes
    }
    }