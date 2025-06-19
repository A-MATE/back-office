import { organizationFormSchema } from "@/lib/validators";
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
  logo: {
    thumbnail: string;
    large: string;
  };
  contact?: Contact;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  isActive: boolean;
};

export type OrganizationFormData = z.infer<typeof organizationFormSchema>;
export type Organization = CreateOrganizationResponse;
