// lib/api/user.ts
import { fetcher } from "./fetcher";

export async function getUserById(id: string, token: string) {
  return fetcher(`/api/v1/users/${id}`, token);
}
