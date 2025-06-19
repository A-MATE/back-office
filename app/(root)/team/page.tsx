import { PageHeader } from "@/components/shared/page-header";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { CreateTeam } from "@/components/team/create-team";
import { TeamTable } from "@/components/team/team-table";

export default async function TeamsPage() {
  return (
    <PageWrapper>
      <PageHeader heading="Teams" description="List of Teams" />
      <CreateTeam />
      <TeamTable />
    </PageWrapper>
  );
}
