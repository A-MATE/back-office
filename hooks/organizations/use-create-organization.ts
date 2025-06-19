import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationKeys } from "./organization-keys";
import { createOrganization } from "@/lib/api/organization/organization";
import { CreateOrganizationRequest } from "@/types/organization";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateOrganizationRequest) => createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
    },
    onError: (error) => {
      console.error("Error creating organization:", error);
    },
  });

  return {
    ...mutation,
  };
};
