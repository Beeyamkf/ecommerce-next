"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/app/actions/auth";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";

export default function RegisterForm() {
  const [state, action] = useActionState(register, undefined);

  return (
    <form action={action}>
      <Input
        label="Name"
        name="name"
        placeholder="Ahmed"
        errors={state?.errors?.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="ahmed@mail.com"
        errors={state?.errors?.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        errors={state?.errors?.password}
      />

      {state?.message && <p className="text-red-500 mb-4">{state.message}</p>}

      <SubmitButton label="Create my account " />

      <p className="mt-4 text-sm text-center">
        Already have an account ?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
