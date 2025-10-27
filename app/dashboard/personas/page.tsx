"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import PersonaCard from "@/app/test/test2/page";
import { EmptyState } from "@/components/EmptyState/Dashboard/EmptyState";
import { Persona } from "@/lib/types/persona.types";
import { PersonaSkeleton } from "@/components/skeletons/personas/PersonaSkeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Personas() {
  const userId = useSession().data?.user?.id;

  const {
    data: personas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["personas", userId],
    queryFn: async () => {
      const res = await fetch(`/api/persona?userId=${userId}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to fetch personas");
      }
      toast.success("Personas fetched successfully");
      return data.personas;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Your Personas
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Manage and view your saved personas below.
          </p>
        </div>

        {!isLoading && personas.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </Button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-in fade-in">
          {Array.from({ length: 6 }).map((_, i) => (
            <PersonaSkeleton key={i} idx={i} />
          ))}
        </div>
      ) : personas.length === 0 ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300">
          {personas.map((persona: Persona) => (
            <div
              key={persona.personaId}
              className="hover:-translate-y-1 hover:shadow-md transition-transform duration-200"
            >
              <PersonaCard persona={persona} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
