import { DashboardCards } from "@/features/dashboard/dashboard-cards";
import { DashboardCharts } from "@/features/dashboard/dashboard-charts";
import { DashboardHeader } from "@/features/dashboard/dashboard-header";
import { DashboardShell } from "@/features/dashboard/dashboard-shell";
import { RecentUsers } from "@/features/dashboard/recent-users";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Back-Office Admin",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        description="Overview of your SaaS metrics and activity."
      />
      <div className="grid gap-4 md:gap-8">
        <DashboardCards />
        <DashboardCharts />
        <RecentUsers />
      </div>
    </DashboardShell>
  );
}
