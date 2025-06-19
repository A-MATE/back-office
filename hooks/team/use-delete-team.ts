import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "./team-keys";
import { deleteTeam } from "@/lib/api/team/team";

export const useDeleteTeam = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
};
