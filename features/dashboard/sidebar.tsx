"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { UserNav } from "@/components/dashboard/user-nav";
import { ChartBar, Settings, User } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { UserNav } from "./user-nav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const routes = [
    {
      href: "/dashboard",
      icon: <ChartBar className="mr-2 h-4 w-4" />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/users",
      icon: <User className="mr-2 h-4 w-4" />,
      title: "Users",
    },
    {
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      title: "Settings",
    },
  ];

  const SidebarContent = (
    <>
      <div className="flex h-16 items-center px-4 border-b">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/public/images/logo.png"
            alt="brand-logo"
            className="h-6 w-6"
          />
          <span>{APP_NAME}</span>
        </Link>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight">
          General
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-secondary"
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={route.href}>
                {route.icon}
                {route.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto border-t p-4">
        <UserNav mobile />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden absolute left-4 top-4 z-40"
          >
            {/* <Icons.menu className="h-4 w-4" /> */}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex flex-col">
          <ScrollArea className="flex-1">{SidebarContent}</ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex md:w-64 md:flex-col md:inset-y-0 z-30 h-screen border-r bg-background",
          className
        )}
      >
        <ScrollArea className="flex flex-1 flex-col">
          {SidebarContent}
        </ScrollArea>
      </div>
    </>
  );
}
