import { useQuery } from "@tanstack/react-query";
import { Team } from "@/types/team";
import { getTeamById } from "@/lib/api/team/team";
import { teamKeys } from "./team-keys";
import { mapTeam } from "@/lib/mappers/team-mapper";

export function useTeam(id: string) {
  return useQuery<Team>({
    queryKey: teamKeys.detail(id),
    queryFn: async () => {
      const apiData = await getTeamById(id);
      return mapTeam(apiData);
    },
    enabled: !!id,
  });
}
