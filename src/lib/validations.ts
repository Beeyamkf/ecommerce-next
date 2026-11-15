import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.email("Email invalide").transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export const productSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug : minuscules, chiffres et tirets seulement"),
  description: z.string().min(10, "Description trop courte"),
  price: z.number().int().positive("Le prix doit être positif"),
  stock: z.number().int().min(0).default(0),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;