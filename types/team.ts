import { teamFormSchema } from "@/lib/validators";
import z from "zod";

export enum AgeGroup {
  U6 = "Under 6",
  U9 = "Under 9",
  U13 = "Under 13",
  U15 = "Under 15",
  U17 = "Under 17",
  U19 = "Under 19",
  Senior = "Senior",
  Veteran = "Veteran",
}

export enum TeamGender {
  Male = "Male",
  Female = "Female",
  Mixed = "Mixed",
}

export type Team = {
  id: string;
  name: string;
  description?: string;
  logo?: {
    thumbnail: string;
    large: string;
  };
  ageGroup?: AgeGroup;
  gender?: TeamGender;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  isActive: boolean;
  organizationId: string;
};

export type TeamFormData = z.infer<typeof teamFormSchema>;
