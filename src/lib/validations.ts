import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email").transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export const productSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug : lowercase letters, numbers and dashes only"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().int().positive("Price must be positive"),
  stock: z.number().int().min(0).default(0),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;