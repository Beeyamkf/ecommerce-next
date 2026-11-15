"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
    >
      {pending ? "Chargement..." : label}
    </button>
  );
}
