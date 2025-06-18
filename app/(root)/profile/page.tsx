import { PageHeader } from "@/components/shared/page-header";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  return (
    <PageWrapper>
      <PageHeader
        heading="Profile"
        description="Manage your account settings and profile information."
      />
      <div className="grid gap-10">
        <ProfileForm />
      </div>
    </PageWrapper>
  );
}
