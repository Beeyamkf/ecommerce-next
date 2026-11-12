import Link from "next/link";
import Card from "@/components/Card";

export type ProductCardProps = {
  name: string;
  slug: string;
  price: number;
  description: string;
};

export default function ProductCard({
  name,
  slug,
  price,
  description,
}: ProductCardProps) {
  return (
    <Card title={name}>
      <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">
        Image
      </div>

      <p className="text-sm mb-3">{description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">
          {price.toLocaleString("fr-DZ")} DA
        </span>
        <Link
          href={`/products/${slug}`}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Voir
        </Link>
      </div>
    </Card>
  );
}
