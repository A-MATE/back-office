import uploadAxiosClient from "./upload-axios-client";

export const uploadImage = async (formData: FormData) => {
  const response = await uploadAxiosClient.post(
    "/api/v1/upload-image?folder=teams",
    formData
  );
  return response.data as { thumbnail: string; large: string };
};
