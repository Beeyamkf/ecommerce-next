import Link from "next/link";
import Card from "@/components/Card";
import Tilt from "@/components/Tilt";
import { productEmoji } from "@/lib/product-emoji";

export type ProductCardProps = {
  name: string;
  slug: string;
  price: number;
  description: string;
  stock?: number;
};

export default function ProductCard({
  name,
  slug,
  price,
  description,
  stock,
}: ProductCardProps) {
  const soldOut = stock === 0;

  return (
    <Tilt>
      <Card title={name} className="h-full [transform-style:preserve-3d]">
        <div className="relative h-44 mb-4 rounded-xl bg-linear-to-br from-blue-100 via-indigo-100 to-sky-200 flex items-center justify-center [transform-style:preserve-3d]">
          <span className="text-7xl drop-shadow-xl [transform:translateZ(50px)]">
            {productEmoji(slug)}
          </span>
          {soldOut && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
              Out of stock
            </span>
          )}
        </div>

        <p className="text-sm text-slate-600 mb-4">{description}</p>

        <div className="flex items-center justify-between [transform:translateZ(30px)]">
          <span className="text-xl font-extrabold text-blue-600">
            {price.toLocaleString("fr-DZ")} DA
          </span>
          <Link
            href={`/products/${slug}`}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-[0_5px_0_0_#1e40af] hover:bg-blue-500 transition-all active:translate-y-[5px] active:shadow-none"
          >
            View
          </Link>
        </div>
      </Card>
    </Tilt>
  );
}
