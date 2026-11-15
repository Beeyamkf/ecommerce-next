"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { registerSchema, loginSchema } from "@/lib/validations";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";

export type FormState =
  | {
      errors?: Partial<Record<string, string[]>>;
      message?: string;
    }
  | undefined;

export async function register(prevState: FormState, formData: FormData): Promise<FormState> {
  const result = registerSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { name, email, password } = result.data;

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    return { errors: { email: ["Cet email est déjà utilisé"] } };
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning({ id: users.id, email: users.email });

  await createSession({ userId: user.id, email: user.email });
  redirect("/account");
}

export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { email, password } = result.data;

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { message: "Email ou mot de passe incorrect" };
  }

  await createSession({ userId: user.id, email: user.email });
  redirect("/account");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}