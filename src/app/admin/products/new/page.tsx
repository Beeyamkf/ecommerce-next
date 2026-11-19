import ProductForm from "@/components/ProductForm";
import { requireAdmin } from "@/lib/auth";

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold">New product</h1>
      <ProductForm />
    </div>
  );
}
