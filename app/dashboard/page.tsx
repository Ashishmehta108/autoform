import { auth } from "@/auth";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getAllPersona } from "@/lib/actions/persona";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

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
  const { success, personas } = await getAllPersona(session?.user?.id!);
  return (
    <DashboardClient
      session={session}
      fetchError={success === false}
      initialPersonas={personas}
    />
  );
}
