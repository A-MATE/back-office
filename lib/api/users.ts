import axiosClient from "./axios-client";

export async function getUserById(id: string) {
  const response = await axiosClient.get(`/api/v1/users/${id}`);
  return response.data;
}
