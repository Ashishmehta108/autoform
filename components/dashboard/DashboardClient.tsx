"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Plus, User, Briefcase, BarChart3, RefreshCcw } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { PersonaSkeleton } from "@/components/skeletons/personas/PersonaSkeleton";
import { EmptyState } from "@/components/EmptyState/Dashboard/EmptyState";
import PersonaCard from "@/app/test/test2/page";
import CreatePersonaModal from "@/components/Persona/CreatePersona";
import { DashboardStore } from "@/lib/types/Dashboard.types";
import { create } from "zustand";
import { Persona } from "@/lib/types/persona.types";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedPersona: null,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  formsFilledThisMonth: 0,
  successRate: 0,
  setSelectedPersona: (persona) => set({ selectedPersona: persona }),
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setEditModalOpen: (open) => set({ isEditModalOpen: open }),
  incrementFormsFilled: () =>
    set((state) => ({ formsFilledThisMonth: state.formsFilledThisMonth + 1 })),
}));

type DashboardClientProps = {
  session: Session;
};

export default function DashboardClient({ session }: DashboardClientProps) {
  const { setCreateModalOpen, formsFilledThisMonth, successRate } =
    useDashboardStore();
  const userId = useSession().data?.user?.id;
  // const [userId] = useState(session?.user?.id);
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
      toast.success("Personas   fetched successfully");
      return data.personas;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen dark:bg-neutral-900 bg-white p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex  md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage AI-generated personas for form-filling automation
            </p>
          </div>

          <Button
            className="bg-blue-800 cursor-pointer hover:bg-blue-700 text-white"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Persona
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 container mx-auto max-w-6xl">
          <StatsCard
            title="Total Personas"
            value={personas.length}
            description="Active personas"
            icon={User}
          />
          <StatsCard
            title="Forms Filled"
            value={formsFilledThisMonth}
            description="This month"
            icon={Briefcase}
          />
          <StatsCard
            title="Success Rate"
            value={`${successRate}%`}
            description="Average accuracy"
            icon={BarChart3}
          />
        </div>
        <div className="mb-8 ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Your Personas
            </h2>
            {!isLoading && personas.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="flex gap-2"
              >
                Refresh <RefreshCcw className="w-4 h-4" />
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PersonaSkeleton key={i} idx={i} />
              ))}
            </div>
          ) : personas.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {personas.map((persona: Persona) => (
                <PersonaCard key={persona.personaId} persona={persona} />
              ))}
            </div>
          )}
        </div>
        <CreatePersonaModal />
      </div>
    </div>
  );
}
