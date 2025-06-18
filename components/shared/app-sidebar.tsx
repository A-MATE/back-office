"use client";

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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Organizations", url: "/organization", icon: Building2 },
  { title: "Teams", url: "/team", icon: Shield },
  { title: "Players", url: "/player", icon: FileUser },
  { title: "Users", url: "/user", icon: Users },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-64 bg-background border-r">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            A-MATE SPORTS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition",
                        pathname === item.url
                          ? "bg-muted font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-6 border-t border-border">
          <Link href="/profile" className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/a-mate.png" />
              <AvatarFallback>A-M</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">A-Mate</p>
              <p className="text-xs text-muted-foreground">Voir profil</p>
            </div>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
