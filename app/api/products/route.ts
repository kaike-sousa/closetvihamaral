    // app/api/products/route.ts (Next 14 App Router)
    import { NextResponse } from 'next/server';
    import { createClient } from '@supabase/supabase-js';

    const SUPABASE_URL = process.env.SUPABASE_URL!;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!; // SERVICE ROLE

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
    });

    export async function POST(req: Request) {
    try {
        const body = await req.json();
        // body = { product: {...}, variations: [{ color_name, price, sku, stock, sizes: { 'p': 10, 'm':5 }, files: [{name, base64}] }, ...] }
        const { product, variations } = body;

        // 1) create product
        const { data: createdProduct, error: prodErr } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
        if (prodErr) throw prodErr;

        const results = [];

        // 2) for each variation: insert variation, sizes, upload images
        for (const v of variations) {
        const { color_name, price, sku, stock, sizes, files } = v;

        const { data: varData, error: varErr } = await supabase
            .from('product_variations')
            .insert({
            product_id: createdProduct.id,
            color_name,
            price,
            sku,
            stock
            })
            .select()
            .single();
        if (varErr) throw varErr;

        // sizes: object with slug->qty, map slugs to size ids
        for (const [slug, qty] of Object.entries(sizes || {})) {
            // find size id
            const { data: sizeRow } = await supabase
            .from('sizes')
            .select('id,slug')
            .eq('slug', slug)
            .limit(1)
            .maybeSingle();
            if (sizeRow) {
            await supabase.from('product_variation_sizes').insert({
                variation_id: varData.id,
                size_id: sizeRow.id,
                qty: qty ?? 0
            });
            }
        }

        // files: array of {name, base64} - upload to storage
        if (files && files.length) {
            for (const f of files) {
            const buf = Buffer.from(f.base64, 'base64');
            const path = `products/${createdProduct.id}/${varData.id}/${f.name}`;
            const { data: up, error: upErr } = await supabase.storage
                .from('product-images')
                .upload(path, buf, { upsert: true });
            if (upErr) throw upErr;

            const { data: publicUrlData } = supabase.storage
                .from('product-images')
                .getPublicUrl(path);

            await supabase.from('product_images').insert({
                product_id: createdProduct.id,
                variation_id: varData.id,
                storage_path: path,
                url: publicUrlData.publicUrl,
                alt: `${createdProduct.name} - ${color_name}`,
                color_name
            });
            }
        }

        results.push(varData);
        }

        return NextResponse.json({ product: createdProduct, variations: results });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || err }, { status: 500 });
    }
    }
