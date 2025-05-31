import { PageHeader } from "@/components/page-header/page-header";

export default function OrganizationsPage() {
  return (
    <div className="border-1 border-red-500 w-screen px-4 py-4">
      <PageHeader
        title="Organizations"
        actions={[
          {
            label: "Create new organization",
            href: "/organizations/create",
            variant: "default",
          },
        ]}
      />
    </div>
  );
}
