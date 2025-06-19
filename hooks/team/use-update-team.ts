import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "./team-keys";
import { updateTeam } from "@/lib/api/team/team";
import { TeamFormData } from "@/types/team";

export const useUpdateTeam = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TeamFormData) => updateTeam(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};
