import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "./team-keys";
import { createTeam } from "@/lib/api/team/team";
import { TeamFormData } from "@/types/team";

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: TeamFormData) => createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating team:", error);
    },
  });

  return {
    ...mutation,
  };
};
