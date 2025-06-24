"use client";
import React, { useRef, useState } from "react";
import { useUploadImage } from "@/hooks/use-upload-image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type Props = {
  value: { thumbnail: string; large: string };
  onChange: (val: { thumbnail: string; large: string }) => void;
};

export const EditableAvatar = ({ value, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | undefined>(
    value?.thumbnail
  );

  const { mutate: upload, isPending } = useUploadImage();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLocalPreview(previewUrl);

    upload(file, {
      onSuccess: (res) => {
        const { thumbnail, large } = res.data;
        onChange({ thumbnail, large });
      },
      onError: (err) => console.error(err),
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar
          className="w-24 h-24 cursor-pointer"
          onClick={handleAvatarClick}
        >
          <AvatarImage src={localPreview || value?.thumbnail} alt="Team logo" />
          <AvatarFallback>No Image</AvatarFallback>
        </Avatar>
        {isPending && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
            <Loader2 className="animate-spin w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
