import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrganizationFormData, OrganizationType } from "@/types/organization";
import { Switch } from "../ui/switch";
import { organizationFormSchema } from "@/lib/validators";

type Props = {
  onSubmit: (data: OrganizationFormData) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<OrganizationFormData>;
};

export const OrganizationForm = ({
  onSubmit,
  isSubmitting,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues,
  });

  const isActive = watch("isActive");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Organization Name *</Label>
        <Input id="name" {...register("name")} />
      </div>

      <div className="space-y-2">
        <Label>Type *</Label>
        <Select
          onValueChange={(value: OrganizationType) => setValue("type", value)}
          defaultValue={defaultValues?.type}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Organization type" />
          </SelectTrigger>
          <SelectContent>
            {["non-profit", "company", "club", "school"].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.firstName">Contact First Name</Label>
        <Input id="contact.firstName" {...register("contact.firstName")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.lastName">Contact Last Name</Label>
        <Input id="contact.lastName" {...register("contact.lastName")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.email">Contact Email</Label>
        <Input id="contact.email" type="email" {...register("contact.email")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.phone">Phone</Label>
        <Input id="contact.phone" type="tel" {...register("contact.phone")} />
      </div>

      {defaultValues?.isActive !== undefined && (
        <div className="flex items-center gap-2">
          <Label htmlFor="isActive">Active</Label>
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={(checked) => setValue("isActive", checked)}
          />
        </div>
      )}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};
