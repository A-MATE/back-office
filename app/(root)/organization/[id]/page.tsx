"use client";

import { use } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useOrganization } from "@/hooks/organizations/use-organization";
import { useUpdateOrganization } from "@/hooks/organizations/use-update-organization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDeleteOrganization } from "@/hooks/organizations/use-delete-organization";
import { OrganizationForm } from "@/components/organization/organization-form";
import { OrganizationFormData } from "@/types/organization";

type Props = {
  params: Promise<{ id: string }>;
};

export default function OrganizationDetail({ params }: Props) {
  const { id } = use(params);
  const { data: organization, isLoading, error } = useOrganization(id);
  const updateMutation = useUpdateOrganization(id);
  const deleteMutation = useDeleteOrganization(id);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="p-6 text-red-500">
        An error occurred while loading the organization.
      </div>
    );
  }

  const handleUpdate = (data: OrganizationFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {organization.logo?.thumbnail && (
                <Image
                  src={organization.logo.thumbnail}
                  alt={`${organization.name} logo`}
                  className="h-10 w-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
              )}
              <CardTitle>{organization.name}</CardTitle>
            </div>
            <Badge variant={organization.isActive ? "default" : "destructive"}>
              {organization.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div>
            <strong>ID:</strong> {organization.id}
          </div>
          <div>
            <strong>Type:</strong> {organization.type}
          </div>
          <div>
            <strong>Address:</strong> {organization.address ?? "Not provided"}
          </div>
          <div>
            <strong>Contact Email:</strong>{" "}
            {organization.contact?.email ?? "N/A"}
          </div>
          <div>
            <strong>Phone:</strong> {organization.contact?.phone ?? "N/A"}
          </div>
          <div>
            <strong>Contact Name:</strong>{" "}
            {organization.contact
              ? `${organization.contact.firstName} ${organization.contact.lastName}`
              : "N/A"}
          </div>
          <div>
            <strong>Created at:</strong>{" "}
            {format(new Date(organization.createdAt), "MM/dd/yyyy HH:mm")}
          </div>
          <div>
            <strong>Last updated:</strong>{" "}
            {format(new Date(organization.updatedAt), "MM/dd/yyyy HH:mm")}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Organization</DialogTitle>
            </DialogHeader>
            <OrganizationForm
              defaultValues={organization}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isLoading}
            />
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isLoading}
        >
          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
