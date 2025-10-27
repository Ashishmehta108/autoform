"use client";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-700 dark:text-neutral-200">
        <Card className="p-8">
          <CardTitle className="mb-2">Please log in</CardTitle>
          <CardDescription>
            You need to be signed in to view your dashboard.
          </CardDescription>
        </Card>
      </div>
    );
  }
  return <DashboardClient session={session} />;
}
