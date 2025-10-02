import { useDashboardStore } from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, User } from "lucide-react";

export function EmptyState() {
  const { setCreateModalOpen } = useDashboardStore();
  return (
    <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <CardContent className="text-center py-16">
        <User className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-6" />

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          No personas yet
        </h3>

        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
          Create your first AI persona to get started with automated form
          filling and streamline your workflow.
        </p>

        <Button
          variant="default"
          className="px-6 py-2 rounded-lg shadow-sm bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
          onClick={() => setCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Persona
        </Button>
      </CardContent>
    </Card>
  );
}
