import { uploadImage } from "@/lib/api/image-upload";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("file", file);
      return uploadImage(formData);
    },
  });
};
