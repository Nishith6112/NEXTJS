import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/product";

const filePath = path.join(process.cwd(), "data/products.json");

const readProducts = (): Product[] => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8").trim();
  return data ? JSON.parse(data) : [];
};

const writeProducts = (products: Product[]) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

export async function GET() {
  return NextResponse.json(readProducts());
}

export async function POST(req: Request) {
  const body = await req.json();
  const products = readProducts();

  const newProduct: Product = {
    id: Date.now().toString(),
    name: body.name,
    description: body.description,
    price: Number(body.price),
    image: body.image,
  };

  products.push(newProduct);
  writeProducts(products);

  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const products = readProducts();

  const index = products.findIndex(p => p.id === body.id);
  products[index] = body;

  writeProducts(products);
  return NextResponse.json(body);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  writeProducts(readProducts().filter(p => p.id !== id));
  return NextResponse.json({ success: true });
}
