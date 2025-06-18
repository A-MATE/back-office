import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrganization } from "@/lib/api/organization/organization";
import { organizationKeys } from "./organization-keys";
import type { OrganizationFormData } from "@/types/organization";

export const useUpdateOrganization = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrganizationFormData) => updateOrganization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
    },
  });
};
