"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import type { OrganizationFormData } from "@/types/organization";
import { OrganizationForm } from "./organization-form";
import { useCreateOrganization } from "@/hooks/organizations/use-create-organization";

export const CreateOrganization = () => {
  const [open, setOpen] = useState(false);
  const { mutate: createOrganization, isLoading } = useCreateOrganization();

  const handleSubmit = (formData: OrganizationFormData) => {
    createOrganization(formData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Fill out the information below to create your organization.
          </DialogDescription>
        </DialogHeader>

        <OrganizationForm onSubmit={handleSubmit} isSubmitting={isLoading} />
      </DialogContent>
    </Dialog>
  );
};
