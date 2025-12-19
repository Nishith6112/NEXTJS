"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

type Props = {
  onSave: (product: Product) => void;
  product?: Product | null;
  onCancel?: () => void;
};

export default function ProductForm({ onSave, product, onCancel }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImage(product.image);
    }
  }, [product]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) return alert("Please upload image");

    onSave({
      id: product?.id || crypto.randomUUID(),
      name,
      description,
      price: Number(price),
      image,
    });

    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
      <input
        className="input"
        placeholder="Product name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <textarea
        className="input min-h-[90px]"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        className="input"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Products Image
        </label>

        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-black rounded-xl p-6 cursor-pointer hover:border-[#06bcc1]"
        >
          {image ? (
            <img src={image} className="h-40 w-full object-cover rounded-lg" />
          ) : (
            <>
           
              <p className="text-sm text-neutral-600">Click to upload image</p>
              <p className="text-xs text-neutral-400">PNG, JPG, JPEG</p>
            </>
          )}
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <button className="w-full bg-[#06bcc1] text-white py-2 rounded-xl">
        {product ? "Update Product" : "Add Product"}
      </button>

      {product && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full border rounded-xl py-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
