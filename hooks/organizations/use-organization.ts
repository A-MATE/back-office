import { getOrganizationById } from "@/lib/api/organization/organization";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { organizationKeys } from "./organization-keys";

export function useOrganization(id: string) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => getOrganizationById(id),
    enabled: !!id && !!token,
  });
}
