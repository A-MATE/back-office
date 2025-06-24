import { ApiTeam, AgeGroup, TeamGender, Team } from "@/types/team";
import { mapEnumValue } from "@/utils/map-enum-value";

export const mapTeam = (apiData: ApiTeam): Team => ({
  id: apiData.id ?? "",
  name: apiData.name ?? "",
  description: apiData.description ?? "",
  ageGroup: mapEnumValue(AgeGroup, apiData.ageGroup),
  gender: mapEnumValue(TeamGender, apiData.gender),
  isActive: apiData.isActive ?? true,
  organizationId: apiData.organizationId ?? "",
  logo: {
    thumbnail: apiData.logo?.thumbnail ?? "",
    large: apiData.logo?.large ?? "",
  },
  createdAt: apiData.createdAt ?? "",
  updatedAt: apiData.updatedAt ?? null,
  deletedAt: apiData.deletedAt ?? null,
});
