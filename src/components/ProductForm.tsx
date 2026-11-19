"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveProduct } from "@/app/actions/products";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";

type ProductFormProps = {
  product?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
  };
};

export default function ProductForm({ product }: ProductFormProps) {
  const [state, action] = useActionState(saveProduct, undefined);

  return (
    <form
      action={action}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
    >
      {product && <input type="hidden" name="id" value={product.id} />}

      <Input
        label="Name"
        name="name"
        defaultValue={product?.name}
        errors={state?.errors?.name}
      />
      <Input
        label="Slug (URL)"
        name="slug"
        placeholder="black-hoodie"
        defaultValue={product?.slug}
        errors={state?.errors?.slug}
      />

      <div className="mb-4">
        <label htmlFor="description" className="mb-1 block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={product?.description}
          className={`w-full rounded border bg-transparent px-3 py-2 ${
            state?.errors?.description ? "border-red-500" : "border-gray-400"
          }`}
        />
        {state?.errors?.description?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Price (DA)"
          name="price"
          type="number"
          defaultValue={product?.price}
          errors={state?.errors?.price}
        />
        <Input
          label="Stock"
          name="stock"
          type="number"
          defaultValue={product?.stock ?? 0}
          errors={state?.errors?.stock}
        />
      </div>

      <div className="mt-2 flex items-center gap-4">
        <div className="flex-1">
          <SubmitButton label={product ? "Save changes" : "Create product"} />
        </div>
        <Link href="/admin/products" className="text-slate-500 hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
