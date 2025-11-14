    // services/product.ts
    import { supabase } from "@/lib/supabase";

    export async function fetchCategories() {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

    if (error) throw error;
    return data;
    }

    export async function fetchProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
    }

    export async function fetchProductById(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
    }

    export async function createProduct(payload: any) {
    const { images, ...product } = payload;

    const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select()
        .single();

    if (error) throw error;

    // upload images
    if (images && images.length) {
        for (const file of images) {
        const path = `products/${data.id}/${file.name}`;

        const up = await supabase.storage
            .from("products")
            .upload(path, file);

        if (up.error) throw up.error;

        const url = supabase.storage
            .from("products")
            .getPublicUrl(path).data.publicUrl;

        await supabase.from("product_images").insert([
            { product_id: data.id, image_url: url, alt: file.name }
        ]);
        }
    }

    return data;
    }

    export async function updateProduct(id: string, payload: any) {
    const { images, ...product } = payload;

    const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    if (images && images.length) {
        for (const file of images) {
        const path = `products/${id}/${file.name}`;

        const up = await supabase.storage
            .from("products")
            .upload(path, file);

        if (up.error) throw up.error;

        const url = supabase.storage
            .from("products")
            .getPublicUrl(path).data.publicUrl;

        await supabase.from("product_images").insert([
            { product_id: id, image_url: url, alt: file.name }
        ]);
        }
    }

    return data;
    }

    export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;

    return true;
    }
