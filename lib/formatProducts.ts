    export function formatProduct(product: any) {
    // 🎨 Agrupar imagens por cor
    const colorsMap: Record<string, { name: string; hex: string; images: string[] }> = {}

    product.produto_imagens?.forEach((img: any) => {
        if (!colorsMap[img.color]) {
        colorsMap[img.color] = {
            name: img.color,
            hex: '#ccc', // pode melhorar depois
            images: []
        }
        }

        colorsMap[img.color].images.push(img.image_url)
    })

    const colors = Object.values(colorsMap)

    // 📏 Tamanhos únicos
    const sizes = [
        ...new Set(product.produto_variantes?.map((v: any) => v.size))
    ]

    return {
        ...product,
        colors,
        sizes
    }
    }