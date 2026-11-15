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
        label="Mot de passe"
        name="password"
        type="password"
        errors={state?.errors?.password}
      />

      {state?.message && <p className="text-red-500 mb-4">{state.message}</p>}

      <SubmitButton label="Se connecter" />

      <p className="mt-4 text-sm text-center">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}
