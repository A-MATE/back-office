import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/users";
import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const token = session?.accessToken;

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId && !!token,
  });
}
