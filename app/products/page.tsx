"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  async function load() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function save(product: Product) {
    await fetch("/api/products", {
      method: "PUT",
      body: JSON.stringify(product),
    });
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">

      {/* EDIT FORM (ONLY WHEN EDITING) */}
      {editing && (
        <ProductForm
          product={editing}
          onSave={save}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* PRODUCT LIST */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onEdit={() => setEditing(p)}
            onDelete={() => remove(p.id)}
          />
        ))}
      </section>

    </main>
  );
}
