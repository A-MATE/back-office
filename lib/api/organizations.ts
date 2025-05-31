import { fetcher } from "./fetcher";

export async function getAllOrganizations(token: string) {
  return fetcher("/api/v1/organizations", token);
}
