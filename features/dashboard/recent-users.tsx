"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowRight } from "lucide-react";

export function RecentUsers() {
  // Mock data - in a real app, this would come from your API
  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      image: null,
      status: "active",
      joinedAt: "2023-10-15T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@example.com",
      image: null,
      status: "active",
      joinedAt: "2023-10-12T00:00:00.000Z",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      image: null,
      status: "inactive",
      joinedAt: "2023-10-08T00:00:00.000Z",
    },
    {
      id: "4",
      name: "Emma Davis",
      email: "emma@example.com",
      image: null,
      status: "active",
      joinedAt: "2023-10-05T00:00:00.000Z",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>
            {users.length} users joined recently.
          </CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/users">
            <span className="mr-1">View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => {
            const formattedDate = new Date(user.joinedAt).toLocaleDateString(
              undefined,
              { month: "short", day: "numeric", year: "numeric" }
            );

            const userInitials = user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={user.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div
                      className={`mr-2 h-2 w-2 rounded-full ${
                        user.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span className="text-xs capitalize">{user.status}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Joined {formattedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
