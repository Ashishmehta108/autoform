"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PersonaSkeleton({ idx }: { idx: number }) {
  return (
    <Card
      key={idx}
      className="border-neutral-200 dark:border-neutral-700 transition-colors"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-32" />
            <div className="h-3 bg-neutral-100 dark:bg-neutral-600 rounded animate-pulse w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse w-40" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse w-36" />
          </div>
        </div>
        <div className="h-12 bg-neutral-100 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="flex space-x-2">
          <div className="h-9 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse flex-1" />
          <div className="h-9 bg-neutral-100 dark:bg-neutral-600 rounded animate-pulse w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
