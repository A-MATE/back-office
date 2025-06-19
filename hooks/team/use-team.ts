import { useQuery } from "@tanstack/react-query";
import { Team } from "@/types/team";
import { getTeamById } from "@/lib/api/team/team";
import { teamKeys } from "./team-keys";

export function useTeam(id: string) {
  return useQuery<Team>({
    queryKey: teamKeys.detail(id),
    queryFn: () => getTeamById(id),
    enabled: !!id,
  });
}
