import axiosClient from "../axios-client";

export async function getAllTeams() {
  const response = await axiosClient.get("/api/v1/teams", {
    params: {
      withSoftDeleted: true,
    },
  });

  return response.data;
}

export async function getTeamById(id: string) {
  const response = await axiosClient.get(`/api/v1/teams/${id}`);
  return response.data;
}

export async function createTeam(data: any) {
  const response = await axiosClient.post("/api/v1/teams", data);

  return response.data;
}

export async function updateTeam(id: string, data: any) {
  const response = await axiosClient.put(`/api/v1/teams/${id}`, data);
  return response.data;
}

export async function deleteTeam(id: string) {
  const response = await axiosClient.delete(`/api/v1/teams/${id}`);
  return response.data;
}
