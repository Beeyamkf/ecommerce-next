"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);

  return (
    <form action={action}>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="ahmed@mail.com"
        errors={state?.errors?.email}
      />
      <Input
        label="Passsword"
        name="password"
        type="password"
        errors={state?.errors?.password}
      />

      {state?.message && <p className="text-red-500 mb-4">{state.message}</p>}

      <SubmitButton label="Sign in " />

      <p className="mt-4 text-sm text-center">
        Don't have an account ?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
