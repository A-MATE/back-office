"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { teamFormSchema } from "@/lib/validators";
import { useOrganizations } from "@/hooks/organizations/use-organizations";
import { AgeGroup, TeamFormData, TeamGender } from "@/types/team";
import { EditableAvatar } from "../shared/editable-avatar";

type Props = {
  defaultValues?: TeamFormData;
  onSubmit: (data: TeamFormData) => void;
  isSubmitting?: boolean;
};

export const TeamForm = ({ defaultValues, onSubmit, isSubmitting }: Props) => {
  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      description: "",
      ageGroup: undefined,
      gender: undefined,
      isActive: true,
      logo: {
        thumbnail: "",
        large: "",
      },
      organizationId: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const { data: organizations = [], isLoading: isOrgLoading } =
    useOrganizations();

  console.log("watch logo:", form.watch("logo"));

  const onFormSubmit = (data: TeamFormData) => {
    console.log("SUBMIT data:", data);
    onSubmit(data);
  };
  const submit = form.handleSubmit(onFormSubmit);

  return (
    <Form {...form}>
      <form onSubmit={submit} className="space-y-4">
        <Controller
          name="logo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <EditableAvatar
                value={field.value}
                onChange={(data) => {
                  console.log("DATA RHF:", data);
                  field.onChange(data);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <Input {...field} placeholder="Enter team name" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input {...field} placeholder="Optional description" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isOrgLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age Group</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AgeGroup).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TeamGender).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};
