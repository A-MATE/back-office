import {
  CreateOrganizationRequest,
  OrganizationFormData,
} from "@/types/organization";
import axiosClient from "../axios-client";

export async function getAllOrganizations() {
  const response = await axiosClient.get("/api/v1/organizations", {
    params: {
      withSoftDeleted: true,
    },
  });

  return response.data;
}

export async function getOrganizationById(id: string) {
  const response = await axiosClient.get(`/api/v1/organizations/${id}`);
  return response.data;
}

export async function createOrganization(data: CreateOrganizationRequest) {
  const response = await axiosClient.post("/api/v1/organizations", data);

  return response.data;
}

export async function updateOrganization(
  id: string,
  data: OrganizationFormData
) {
  const response = await axiosClient.put(`/api/v1/organizations/${id}`, data);
  return response.data;
}

export async function deleteOrganization(id: string) {
  const response = await axiosClient.delete(`/api/v1/organizations/${id}`);
  return response.data;
}
