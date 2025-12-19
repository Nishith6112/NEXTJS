"use client";

import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  async function save(product: any) {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    alert("Product added successfully");
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <ProductForm onSave={save} />

      <button
        onClick={() => router.push("/products")}
        className="w-full bg-black text-white py-2 rounded-xl"
      >
        Visit Product List
      </button>
    </main>
  );
}

  