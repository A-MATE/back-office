import * as z from "zod";

export type Contact = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export type OrganizationType = "company" | "club" | "school" | "non-profit";

export type CreateOrganizationRequest = {
  name: string;
  type: OrganizationType;
  address?: string;
  contact?: Contact;
};

export type CreateOrganizationResponse = {
  id: string;
  name: string;
  type: OrganizationType;
  address?: string;
  contact?: Contact;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  isActive: boolean;
};

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

export type OrganizationFormData = z.infer<typeof organizationFormSchema>;
