    "use client";

    import React, { useState, useEffect } from "react";
    import { createClient } from "@supabase/supabase-js";

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

    type Size = { id: number; slug: string; label: string };

    export default function AdminProductForm() {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
    });

    const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});
    const [variations, setVariations] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
        const { data } = await supabase
            .from("sizes")
            .select("*")
            .order("display_order");

        setSizes(data || []);
        })();
    }, []);

    function addVariation() {
        setVariations((prev) => [
        ...prev,
        { id: Date.now(), color_name: "", files: [], sizes: {}, price: 0, stock: 0 },
        ]);
    }

    function updateVariation(index: number, patch: any) {
        setVariations((prev) =>
        prev.map((v, i) => (i === index ? { ...v, ...patch } : v))
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
        product,
        variations: await Promise.all(
            variations.map(async (v) => {
            const files = await Promise.all(
                (v.files || []).map(async (file: File) => {
                const b64 = await fileToBase64(file);
                return { name: file.name, base64: b64.split(",")[1] };
                })
            );
            return {
                color_name: v.color_name,
                price: v.price || product.price,
                sku: v.sku || null,
                stock: v.stock || 0,
                sizes: v.sizes || {},
                files,
            };
            })
        ),
        };

        const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data);

        alert("Produto criado");
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-6"
        >
        <h2 className="text-2xl font-semibold">Novo Produto</h2>

        {/* Nome */}
        <div>
            <label className="text-sm font-medium">Nome</label>
            <input
            placeholder="Nome do produto"
            value={product.name}
            onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
            />
        </div>

        {/* Descrição */}
        <div>
            <label className="text-sm font-medium">Descrição</label>
            <textarea
            placeholder="Descrição"
            value={product.description}
            onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
            />
        </div>

        {/* Preço */}
        <div>
            <label className="text-sm font-medium">Preço</label>
            <input
            type="number"
            placeholder="Preço"
            value={product.price}
            onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
            }
            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
            />
        </div>

        {/* TAMANHOS */}
        <div>
            <h3 className="text-lg font-medium">Tamanhos</h3>

            <div className="flex gap-4 flex-wrap mt-2">
            {sizes.map((s) => (
                <label
                key={s.slug}
                className="flex items-center gap-2 text-sm border px-3 py-2 rounded-md"
                >
                <input
                    type="checkbox"
                    onChange={(e) => {
                    const next = { ...selectedSizes };
                    if (e.target.checked) next[s.slug] = next[s.slug] ?? 0;
                    else delete next[s.slug];
                    setSelectedSizes(next);
                    }}
                />
                {s.label}
                </label>
            ))}
            </div>
        </div>

        {/* VARIAÇÕES */}
        <div>
            <h3 className="text-lg font-medium">Variações</h3>

            <button
            type="button"
            onClick={addVariation}
            className="mt-2 px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
            + Adicionar variação
            </button>

            {variations.map((v, idx) => (
            <div
                key={v.id}
                className="border rounded-xl p-4 mt-4 shadow-sm bg-white space-y-4"
            >
                {/* Cor + SKU */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Cor</label>
                    <input
                    placeholder="Cor"
                    value={v.color_name}
                    onChange={(e) =>
                        updateVariation(idx, { color_name: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">SKU</label>
                    <input
                    placeholder="SKU"
                    value={v.sku || ""}
                    onChange={(e) =>
                        updateVariation(idx, { sku: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                    />
                </div>
                </div>

                {/* Preço / Estoque */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Preço da variação</label>
                    <input
                    type="number"
                    value={v.price || product.price}
                    onChange={(e) =>
                        updateVariation(idx, { price: Number(e.target.value) })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Estoque total</label>
                    <input
                    type="number"
                    value={v.stock || 0}
                    onChange={(e) =>
                        updateVariation(idx, { stock: Number(e.target.value) })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                    />
                </div>
                </div>

                {/* QUANTIDADE POR TAMANHO */}
                <div>
                <label className="font-medium text-sm">Quantidades por tamanho</label>

                <div className="grid grid-cols-2 gap-4 mt-2">
                    {sizes.map((s) => (
                    <div key={s.slug}>
                        <label className="text-sm">{s.label}</label>
                        <input
                        type="number"
                        defaultValue={v.sizes?.[s.slug] ?? 0}
                        onChange={(e) =>
                            updateVariation(idx, {
                            sizes: {
                                ...v.sizes,
                                [s.slug]: Number(e.target.value),
                            },
                            })
                        }
                        className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                        />
                    </div>
                    ))}
                </div>
                </div>

                {/* Imagens */}
                <div>
                <label className="text-sm font-medium">Imagens</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    updateVariation(idx, { files: [...(v.files || []), file] });
                    }}
                    className="mt-1"
                />

                <div className="text-xs text-gray-500 mt-2">
                    {(v.files || []).map((f: File, i: number) => (
                    <div key={i}>{f.name}</div>
                    ))}
                </div>
                </div>

                {/* Remover variação */}
                <button
                type="button"
                onClick={() =>
                    setVariations((prev) => prev.filter((_, i) => i !== idx))
                }
                className="text-red-500 text-sm"
                >
                Remover variação
                </button>
            </div>
            ))}
        </div>

        {/* Submit */}
        <button
            type="submit"
            className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition"
        >
            Criar Produto
        </button>
        </form>
    );
    }

    function fileToBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(String(reader.result));
        reader.onerror = rej;
        reader.readAsDataURL(file);
    });
    }
