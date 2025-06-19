"use client";

import { use } from "react";
import Image from "next/image";
import { format } from "date-fns";

import { TeamFormData } from "@/types/team";

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
import { useTeam } from "@/hooks/team/use-team";
import { useDeleteTeam } from "@/hooks/team/use-delete-team";
import { useUpdateTeam } from "@/hooks/team/use-update-team";
import { TeamForm } from "@/components/team/team-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default function TeamDetail({ params }: Props) {
  const { id } = use(params);
  const { data: team, isLoading, error } = useTeam(id);
  const updateMutation = useUpdateTeam(id);
  const deleteMutation = useDeleteTeam(id);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="p-6 text-red-500">
        An error occurred while loading the team.
      </div>
    );
  }

  const handleUpdate = (data: TeamFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {team.logo?.thumbnail && (
                <Image
                  src={team.logo.thumbnail}
                  alt={`${team.name} logo`}
                  className="h-10 w-10 rounded-full object-cover"
                  width={40}
                  height={40}
                />
              )}
              <CardTitle>{team.name}</CardTitle>
            </div>
            <Badge variant={team.isActive ? "default" : "destructive"}>
              {team.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div>
            <strong>ID:</strong> {team.id}
          </div>
          <div>
            <strong>Description:</strong> {team.description || "—"}
          </div>
          <div>
            <strong>Age Group:</strong> {team.ageGroup || "—"}
          </div>
          <div>
            <strong>Gender:</strong> {team.gender || "—"}
          </div>
          <div>
            <strong>Organization ID:</strong> {team.organizationId}
          </div>
          <div>
            <strong>Created at:</strong>{" "}
            {format(new Date(team.createdAt), "MM/dd/yyyy HH:mm")}
          </div>
          <div>
            <strong>Last updated:</strong>{" "}
            {team.updatedAt
              ? format(new Date(team.updatedAt), "MM/dd/yyyy HH:mm")
              : "—"}
          </div>
          {team.deletedAt && (
            <div>
              <strong>Deleted at:</strong>{" "}
              {format(new Date(team.deletedAt), "MM/dd/yyyy HH:mm")}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
            </DialogHeader>
            <TeamForm
              defaultValues={team}
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
