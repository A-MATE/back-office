import { AgeGroup, TeamGender } from "@/types/team";
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

export const teamFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  ageGroup: z.nativeEnum(AgeGroup).optional(),
  gender: z.nativeEnum(TeamGender).optional(),
  logo: z
    .object({
      thumbnail: z.string().url().or(z.literal("")).optional(),
      large: z.string().url().or(z.literal("")).optional(),
    })
    .optional(),
  isActive: z.boolean().default(true),
  organizationId: z.string().uuid("Invalid organization ID"),
});
