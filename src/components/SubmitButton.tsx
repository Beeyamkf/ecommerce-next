"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-[0_5px_0_0_#1e40af] hover:bg-blue-500 transition-all active:translate-y-[5px] active:shadow-none disabled:opacity-60 disabled:translate-y-[5px] disabled:shadow-none"
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
