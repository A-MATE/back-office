import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { teamKeys } from "./team-keys";
import { getAllTeams } from "@/lib/api/team/team";

export function useTeams() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: teamKeys.lists(),
    queryFn: () => getAllTeams(),
    enabled: !!token,
  });
}
