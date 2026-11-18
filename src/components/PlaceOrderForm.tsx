"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions/order";
import SubmitButton from "@/components/SubmitButton";

export default function PlaceOrderForm() {
  const [state, action] = useActionState(placeOrder, undefined);

  return (
    <form action={action} className="mb-3">
      {state?.message && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
          {state.message}
        </p>
      )}
      <SubmitButton label="Place order" />
    </form>
  );
}
