import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/user";
import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const token = session?.accessToken;

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId!, token!),
    enabled: !!userId && !!token,
  });
}
