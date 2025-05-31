"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Action = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
};

type Props = {
  title: string;
  actions?: Action[];
};

export const PageHeader = ({ title, actions = [] }: Props) => {
  return (
    <div className="w-full bg-amber-700 px-6 py-4">
      {/* <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant={action.variant || "default"}
                size="sm"
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};
