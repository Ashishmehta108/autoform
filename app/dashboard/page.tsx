// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   useQuery,
//   RefetchOptions,
//   QueryObserverResult,
// } from "@tanstack/react-query";
// import { create } from "zustand";
// import { getPersonas } from "@/components/Persona/GetPersonas";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Plus,
//   User,
//   Mail,
//   Briefcase,
//   Settings,
//   BarChart3,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { toast } from "sonner";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import CreatePersonaModal from "@/components/Persona/CreatePersona";
// import { useUserStore } from "@/store/state";
// import { Persona } from "@/lib/types/persona.types";
// import { DashboardStore } from "@/lib/types/Dashboard.types";
// import { DeletePersona } from "@/components/Persona/DeletePersona";
// import { PersonaSkeleton } from "@/components/skeletons/personas/PersonaSkeleton";
// import { EmptyState } from "@/components/EmptyState/Dashboard/EmptyState";
// import { StatsCard } from "@/components/StatsCard";
// import PersonaCard from "../test/test2/page";
// import { Refresh } from "iconsax-reactjs";
// import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

// export const useDashboardStore = create<DashboardStore>((set) => ({
//   selectedPersona: null,
//   isCreateModalOpen: false,
//   isEditModalOpen: false,
//   formsFilledThisMonth: 0,
//   successRate: 0,
//   setSelectedPersona: (persona) => set({ selectedPersona: persona }),
//   setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
//   setEditModalOpen: (open) => set({ isEditModalOpen: open }),
//   incrementFormsFilled: () =>
//     set((state) => ({ formsFilledThisMonth: state.formsFilledThisMonth + 1 })),
// }));

// // function PersonaCard({
// //   persona,
// //   refetch,
// // }: {
// //   persona: Persona;
// //   refetch: (
// //     options?: RefetchOptions
// //   ) => Promise<QueryObserverResult<Persona[], Error>>;
// // }) {
// //   console.log(persona);
// //   const { setSelectedPersona, setEditModalOpen, incrementFormsFilled } =
// //     useDashboardStore();

// //   const handleUsePersona = () => {
// //     setSelectedPersona(persona);
// //     incrementFormsFilled();
// //   };

// //   const handleEditPersona = () => {
// //     setSelectedPersona(persona);
// //     setEditModalOpen(true);
// //   };
// //   const handleDeletePersona = async () => {
// //     try {
// //       const res = await DeletePersona(persona.userId, persona.personaId);
// //       console.log(res.data);
// //       toast.success("persona deleted successfully");
// //       await refetch();
// //     } catch (error) {
// //       toast.error("error while deleting persona try again");
// //     }
// //   };

// //   return (
// //     <Card className="relative bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-inner-sm group">
// //       {/* Subtle inner shadow */}
// //       <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.05)]" />

// //       <CardHeader className="pb-3 relative z-10">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center space-x-3">
// //             <div>
// //               <CardTitle className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
// //                 {persona.personaName}
// //               </CardTitle>
// //               <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400">
// //                 {/* optional role */}
// //               </CardDescription>
// //             </div>
// //           </div>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
// //             onClick={handleEditPersona}
// //           >
// //             <Settings className="w-4 h-4" />
// //           </Button>
// //         </div>
// //       </CardHeader>

// //       <CardContent className="pt-0 space-y-4 relative z-10">
// //         <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
// //           <div className="flex items-center space-x-2">
// //             <Mail className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
// //             <span>{persona.personaEmail}</span>
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <Briefcase className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
// //             {/* optional role */}
// //           </div>
// //         </div>

// //         {persona.personaDescription && (
// //           <>
// //             <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300">
// //               Description
// //             </span>
// //             <ScrollArea className="h-28 text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
// //               {persona.personaDescription}
// //             </ScrollArea>
// //           </>
// //         )}

// //         <div className="flex space-x-2">
// //           <Button
// //             size="sm"
// //             className="bg-rose-600 hover:bg-rose-700 text-white flex-1"
// //             onClick={handleUsePersona}
// //           >
// //             Set Primary
// //           </Button>
// //           <Button
// //             variant="outline"
// //             size="sm"
// //             className="border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
// //             onClick={handleEditPersona}
// //           >
// //             <Edit className="w-4 h-4" />
// //           </Button>
// //           <Button
// //             variant="outline"
// //             size="sm"
// //             className="border-red-100 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-800 hover:text-red-500 dark:hover:text-red-300"
// //             onClick={handleDeletePersona}
// //           >
// //             <Trash2 className="w-4 h-4 mr-1" /> Delete
// //           </Button>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// function Dashboard() {
//   const {
//     selectedPersona,
//     formsFilledThisMonth,
//     successRate,
//     setCreateModalOpen,
//   } = useDashboardStore();
//   const user = useUserStore();

//   const [isMounted, setisMounted] = useState(false);
//   useEffect(() => {
//     setisMounted(true);
//   }, []);
//   const {
//     data: personas = [],
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["personas"],
//     queryFn: () => getPersonas(user.userId),
//     staleTime: 5 * 60 * 1000,
//   });
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Card className="border-gray-200 max-w-md">
//           <CardContent className="text-center py-8">
//             <div className="text-red-500 mb-4 text-4xl">⚠️</div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               Error loading personas
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Failed to fetch your personas. Please try again.
//             </p>
//             <Button
//               className="bg-rose-600 hover:bg-rose-700 text-white"
//               onClick={() => refetch()}
//             >
//               <BarChart3 className="w-4 h-4 mr-2" />
//               Retry
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!isMounted) return <DashboardSkeleton />;

//   // return <DashboardSkeleton />;
//   return (
//     <div className="min-h-screen dark:bg-neutral-900 bg-neutral-50 p-6 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
//               Dashboard
//             </h1>
//             <p className="text-neutral-600 dark:text-neutral-400">
//               Manage AI-generated personas for form-filling automation
//             </p>
//           </div>
//           <Button
//             className="bg-rose-600 hover:bg-rose-700 text-white shadow-inner-sm transition-shadow"
//             onClick={() => setCreateModalOpen(true)}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Create Persona
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatsCard
//             title="Total Personas"
//             value={personas.length}
//             description="Active personas"
//             icon={User}
//           />
//           <StatsCard
//             title="Forms Filled"
//             value={formsFilledThisMonth}
//             description="This month"
//             icon={Briefcase}
//           />
//           <StatsCard
//             title="Success Rate"
//             value={`${successRate}%`}
//             description="Average accuracy"
//             icon={BarChart3}
//           />
//         </div>

//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
//               Your Personas
//             </h2>
//             {!isLoading && personas.length > 0 && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="border-neutral-300 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300 cursor-pointer flex item-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
//                 onClick={() => refetch()}
//               >
//                 Refresh <Refresh className="w-4 h-4" />
//               </Button>
//             )}
//           </div>

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <div key={index}>
//                   <PersonaSkeleton idx={index} />
//                 </div>
//               ))}
//             </div>
//           ) : personas.length === 0 ? (
//             <EmptyState />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
//               {personas.map((persona) => (
//                 <PersonaCard />
//                 // <PersonaCard
//                 //   refetch={refetch}
//                 //   key={persona.personaId}
//                 //   persona={persona}
//                 // />
//               ))}
//             </div>
//           )}
//         </div>

//         <CreatePersonaModal />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getPersonas } from "@/components/Persona/GetPersonas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User, Briefcase, BarChart3 } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { PersonaSkeleton } from "@/components/skeletons/personas/PersonaSkeleton";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { EmptyState } from "@/components/EmptyState/Dashboard/EmptyState";
import PersonaCard from "../test/test2/page";
import CreatePersonaModal from "@/components/Persona/CreatePersona";
import { create } from "zustand";
import { DashboardStore } from "@/lib/types/Dashboard.types";
import { Refresh } from "iconsax-reactjs";

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
function Dashboard() {
  const { data: session, status } = useSession();
  const { setCreateModalOpen, formsFilledThisMonth, successRate } =
    useDashboardStore();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const userId = session?.user?.id;

  const {
    data: personas = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["personas", userId],
    queryFn: () => getPersonas(userId as string),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  if (status === "loading" || !isMounted) {
    return <DashboardSkeleton />;
  }

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="border-gray-200 max-w-md">
          <CardContent className="text-center py-8">
            <div className="text-red-500 mb-4 text-4xl">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error loading personas
            </h3>
            <p className="text-gray-600 mb-4">
              Failed to fetch your personas. Please try again.
            </p>
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={() => refetch()}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-neutral-900 bg-neutral-50 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage AI-generated personas for form-filling automation
            </p>
          </div>
          <Button
            className="bg-rose-600 hover:bg-rose-700 text-white shadow-inner-sm transition-shadow"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Persona
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Your Personas
            </h2>
            {!isLoading && personas.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="border-neutral-300 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300 cursor-pointer flex item-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                onClick={() => refetch()}
              >
                Refresh <Refresh className="w-4 h-4" />
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <PersonaSkeleton key={index} idx={index} />
              ))}
            </div>
          ) : personas.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personas.map((persona) => (
                <PersonaCard key={persona.personaId} />
              ))}
            </div>
          )}
        </div>

        <CreatePersonaModal />
      </div>
    </div>
  );
}

export default Dashboard;
