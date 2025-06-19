"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { TeamForm } from "./team-form";
import { useCreateTeam } from "@/hooks/team/use-create-team";
import { TeamFormData } from "@/types/team";

export const CreateTeam = ({}) => {
  const [open, setOpen] = useState(false);
  const { mutate: createTeam, isLoading } = useCreateTeam();

  const handleSubmit = (formData: TeamFormData) => {
    createTeam(formData, {
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

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Fill out the information below to create a new team.
          </DialogDescription>
        </DialogHeader>

        <TeamForm onSubmit={handleSubmit} isSubmitting={isLoading} />
      </DialogContent>
    </Dialog>
  );
};
