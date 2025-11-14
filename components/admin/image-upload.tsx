    // components/ImageUpload.tsx
    'use client'
    import React, { useState } from 'react'


    export default function ImageUpload({ onChange }: { onChange: (files: File[]) => void }) {
    const [previews, setPreviews] = useState<string[]>([])


    function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : []
    onChange(files)
    const urls = files.map(f => URL.createObjectURL(f))
    setPreviews(urls)
    }


    return (
    <div>
    <input type="file" multiple accept="image/*" onChange={handleFiles} />
    <div className="flex gap-2 mt-2">
    {previews.map((p, i) => (
    <img key={i} src={p} alt={`preview-${i}`} className="w-24 h-24 object-cover rounded" />
    ))}
    </div>
    </div>
    )
    }