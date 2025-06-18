import { getAllOrganizations } from "@/lib/api/organization/organization";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { organizationKeys } from "./organization-keys";

export function useOrganizations() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: organizationKeys.lists(),
    queryFn: () => getAllOrganizations(),
    enabled: !!token,
  });
}
