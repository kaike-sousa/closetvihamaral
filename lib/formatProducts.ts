    export function formatProduct(product: any) {
    const colorsMap: Record<
        string,
        { name: string; hex: string; images: string[] }
    > = {}

    product.produto_imagens?.forEach((img: any) => {
        if (!colorsMap[img.color]) {
        colorsMap[img.color] = {
            name: img.color,
            hex: '#ccc',
            images: []
        }
        }

        // EVITA DUPLICAR IMAGEM
        if (!colorsMap[img.color].images.includes(img.image_url)) {
        colorsMap[img.color].images.push(img.image_url)
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