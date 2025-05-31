import { getAllOrganizations } from "@/lib/api/organizations";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";

export function useOrganizations() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(token!),
    enabled: !!token,
  });
}
