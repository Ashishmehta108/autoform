"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import "../skeletons.css";

export function PersonaSkeleton({ idx }: { idx: number }) {
  return (
    <Card
      key={idx}
      className="border-neutral-200 dark:border-neutral-700 transition-colors"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="skeleton w-12 h-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <div className="skeleton h-4 w-32 rounded" />
            <div className="skeleton h-3 w-24 rounded" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="skeleton w-4 h-4 rounded" />
            <div className="skeleton h-3 w-40 rounded" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="skeleton w-4 h-4 rounded" />
            <div className="skeleton h-3 w-36 rounded" />
          </div>
        </div>
        <div className="skeleton h-12 rounded" />
        <div className="flex space-x-2">
          <div className="skeleton h-9 rounded flex-1" />
          <div className="skeleton h-9 w-20 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
