import { PageHeader } from "@/components/shared/page-header";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { OrganizationTable } from "@/components/organization/organization-table";
import { CreateOrganization } from "@/components/organization/create-organization";

export default function OrganizationsPage() {
  return (
    <PageWrapper>
      <PageHeader heading="Organizations" description="List of organizations" />
      <CreateOrganization />
      <OrganizationTable />
    </PageWrapper>
  );
}
