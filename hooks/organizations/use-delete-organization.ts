import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrganization } from "@/lib/api/organization/organization";
import { organizationKeys } from "./organization-keys";

export const useDeleteOrganization = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
    },
  });
};
