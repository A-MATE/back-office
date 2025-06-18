import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { PageHeader } from "@/components/shared/page-header";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { RecentUsers } from "@/components/dashboard/recent-users";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Back-Office Admin",
};

export default function DashboardPage() {
  return (
    <PageWrapper>
      <PageHeader
        heading="Dashboard"
        description="Overview of your SaaS metrics and activity."
      />
      <div className="grid gap-4 md:gap-8">
        <DashboardCards />
        <DashboardCharts />
        <RecentUsers />
      </div>
    </PageWrapper>
  );
}
