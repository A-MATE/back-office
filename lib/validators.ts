import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const organizationFormSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["non-profit", "company", "club", "school"]),
  address: z.string().optional(),
  contact: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
  isActive: z.boolean().optional(),
});
