import { DashboardHeader } from "@/features/dashboard/dashboard-header";
import { DashboardShell } from "@/features/dashboard/dashboard-shell";
import { ProfileForm } from "@/features/profile/profile-form";

export default async function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        description="Manage your account settings and profile information."
      />
      <div className="grid gap-10">
        <ProfileForm />
      </div>
    </DashboardShell>
  );
}
