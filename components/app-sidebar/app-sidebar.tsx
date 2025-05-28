import {
  Building2,
  FileUser,
  LayoutDashboard,
  Shield,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Organizations",
    url: "/organizations",
    icon: Building2,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Shield,
  },
  {
    title: "Players",
    url: "/players",
    icon: FileUser,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>A-MATE SPORTS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Avatar cliquable en bas */}
        <div className="mt-auto p-6">
          <Link href="/profile" className="inline-block">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/a-mate.png" />
              <AvatarFallback>A-M</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
