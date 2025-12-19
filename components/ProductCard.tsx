import { Product } from "@/types/product";

type Props = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-3">
      <img src={product.image} className="h-44 w-full object-cover rounded-xl" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-neutral-600">{product.description}</p>
      <p className="font-bold">₹ {product.price}</p>

      <div className="flex gap-2">
        <button onClick={onEdit} className="flex-1 bg-[#06bcc1] text-white py-1.5 rounded-lg">
          Edit
        </button>
        <button onClick={onDelete} className="flex-1 bg-rose-500 text-white py-1.5 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
}
