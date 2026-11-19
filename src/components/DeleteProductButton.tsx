"use client";

import { useActionState } from "react";
import { deleteProduct } from "@/app/actions/products";

export default function DeleteProductButton({
  productId,
  productName,
}: {
  productId: number;
  productName: string;
}) {
  const [state, action, pending] = useActionState(
    deleteProduct.bind(null, productId),
    undefined,
  );

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${productName}"?`)) e.preventDefault();
      }}
      className="inline"
    >
      <button
        type="submit"
        disabled={pending}
        className="ml-4 font-medium text-red-600 hover:underline disabled:opacity-50"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {state?.message && (
        <p className="mt-1 text-xs text-red-600">{state.message}</p>
      )}
    </form>
  );
}
