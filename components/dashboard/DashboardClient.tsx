// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import { useSession } from "next-auth/react";
// // import { auth } from "@/auth";
// // import { getPersonas } from "@/components/Persona/GetPersonas";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Plus, User, Briefcase, BarChart3 } from "lucide-react";
// // import { StatsCard } from "@/components/StatsCard";
// // import { PersonaSkeleton } from "@/components/skeletons/personas/PersonaSkeleton";
// // import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
// // import { EmptyState } from "@/components/EmptyState/Dashboard/EmptyState";
// // import PersonaCard from "../test/test2/page";
// // import CreatePersonaModal from "@/components/Persona/CreatePersona";
// // import { create } from "zustand";
// // import { DashboardStore } from "@/lib/types/Dashboard.types";
// // import { Refresh } from "iconsax-reactjs";

// // export const useDashboardStore = create<DashboardStore>((set) => ({
// //   selectedPersona: null,
// //   isCreateModalOpen: false,
// //   isEditModalOpen: false,
// //   formsFilledThisMonth: 0,
// //   successRate: 0,
// //   setSelectedPersona: (persona) => set({ selectedPersona: persona }),
// //   setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
// //   setEditModalOpen: (open) => set({ isEditModalOpen: open }),
// //   incrementFormsFilled: () =>
// //     set((state) => ({ formsFilledThisMonth: state.formsFilledThisMonth + 1 })),
// // }));
// // function Dashboard() {
// //   const { data: session, status } = useSession();
// //   const { setCreateModalOpen, formsFilledThisMonth, successRate } =
// //     useDashboardStore();

// //   const [isMounted, setIsMounted] = useState(false);
// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);
// //   const {
// //     data: personas = [],
// //     isLoading,
// //     error,
// //     refetch,
// //   } = useQuery({
// //     queryKey: ["personas", session?.user?.id],
// //     queryFn: () => getPersonas(session?.user?.id as string),
// //     enabled: !!session?.user?.id,
// //     staleTime: 5 * 60 * 1000,
// //   });

// //   if (status === "loading" || !isMounted) {
// //     return <DashboardSkeleton />;
// //   }

// //   if (!session) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-neutral-700 dark:text-neutral-200">
// //         <Card className="p-8">
// //           <CardTitle className="mb-2">Please log in</CardTitle>
// //           <CardDescription>
// //             You need to be signed in to view your dashboard.
// //           </CardDescription>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-white  flex items-center justify-center">
// //         <Card className="border-neutral-200 max-w-md">
// //           <CardContent className="text-center py-8">
// //             <div className="text-red-500 mb-4 text-4xl">⚠️</div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-2">
// //               Error loading personas
// //             </h3>
// //             <p className="text-gray-600 mb-4">
// //               Failed to fetch your personas. Please try again.
// //             </p>
// //             <Button
// //               className="bg-rose-600 hover:bg-rose-700 text-white"
// //               onClick={() => refetch()}
// //             >
// //               <BarChart3 className="w-4 h-4 mr-2" />
// //               Retry
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen dark:bg-neutral-900 bg-white p-6 transition-colors duration-300">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
// //           <div>
// //             <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
// //               Dashboard
// //             </h1>
// //             <p className="text-neutral-600 dark:text-neutral-400">
// //               Manage AI-generated personas for form-filling automation
// //             </p>
// //           </div>
// //           <Button
// //             className="bg-rose-600 hover:bg-rose-700 text-white shadow-inner-sm transition-shadow"
// //             onClick={() => setCreateModalOpen(true)}
// //           >
// //             <Plus className="w-4 h-4 mr-2" />
// //             Create Persona
// //           </Button>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <StatsCard
// //             title="Total Personas"
// //             value={personas.length}
// //             description="Active personas"
// //             icon={User}
// //           />
// //           <StatsCard
// //             title="Forms Filled"
// //             value={formsFilledThisMonth}
// //             description="This month"
// //             icon={Briefcase}
// //           />
// //           <StatsCard
// //             title="Success Rate"
// //             value={`${successRate}%`}
// //             description="Average accuracy"
// //             icon={BarChart3}
// //           />
// //         </div>

// //         <div className="mb-8">
// //           <div className="flex items-center justify-between mb-6">
// //             <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
// //               Your Personas
// //             </h2>
// //             {!isLoading && personas.length > 0 && (
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 className="border-neutral-300 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300 cursor-pointer flex item-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
// //                 onClick={() => refetch()}
// //               >
// //                 Refresh <Refresh className="w-4 h-4" />
// //               </Button>
// //             )}
// //           </div>

// //           {isLoading ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {Array.from({ length: 6 }).map((_, index) => (
// //                 <PersonaSkeleton key={index} idx={index} />
// //               ))}
// //             </div>
// //           ) : personas.length === 0 ? (
// //             <EmptyState />
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {personas.map((persona) => (
// //                 <PersonaCard key={persona.personaId} />
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <CreatePersonaModal />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;

// "use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Plus, User, Briefcase, BarChart3, RefreshCcw } from "lucide-react";
// import { StatsCard } from "@/components/StatsCard";
// import { PersonaSkeleton } from "@/components/skeletons/personas/PersonaSkeleton";
// import { EmptyState } from "@/components/EmptyState/Dashboard/EmptyState";
// import PersonaCard from "@/app/test/test2/page";
// import CreatePersonaModal from "@/components/Persona/CreatePersona";
// // import usedashboa
// import { getAllPersona } from "@/lib/actions/persona";
// import { DashboardStore } from "@/lib/types/Dashboard.types";
// import { create } from "zustand";
// import CheckAnimation from "../CheckAnimation";
// import { Persona } from "@/lib/types/persona.types";

// interface GetAllPersonaResponse {
//   success: boolean;
//   message?: string;
//   personas: Persona[];
// }
// type DashboardClientProps = {
//   session: any;
//   initialPersonas: any[];
//   fetchError?: boolean;
// };

// export default function DashboardClient({
//   session,
//   initialPersonas,
//   fetchError,
// }: DashboardClientProps) {
//   const { setCreateModalOpen, formsFilledThisMonth, successRate } =
//     useDashboardStore();
//   const [userId] = useState(session.user.id);
//   //   const {
//   //     data: personas = [],
//   //     isLoading,
//   //     error,
//   //     refetch,
//   //   } = useQuery({
//   //     queryKey: ["personas", session?.user?.id],
//   //     queryFn: () => getPersonas(session?.user?.id as string),
//   //     enabled: !!session?.user?.id,
//   //     staleTime: 5 * 60 * 1000,
//   //   });
//   const {
//     data: personas = [],
//     isLoading,
//     error,
//     refetch,
//   } = useQuery<Persona[], Error>({
//     queryKey: ["personas", userId],
//     queryFn: async () => {
//       try {
//         const res: GetAllPersonaResponse = await getAllPersona(userId);

//         if (!res.success) {
//           throw new Error(res.message || "Failed to fetch personas");
//         }

//         toast(
//           <div className="flex items-center gap-2">
//             <CheckAnimation /> Personas fetched successfully
//           </div>
//         );

//         return res.personas;
//       } catch (error: any) {
//         toast.error(error?.message || "Something went wrong");
//         return [];
//       }
//     },
//   });

//   if (fetchError) {
//     toast.error("Error loading personas from server");
//   }

//   return (
//     <div className="min-h-screen dark:bg-neutral-900 bg-white p-6 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
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
//             className="bg-rose-600 hover:bg-rose-700 text-white"
//             onClick={() => setCreateModalOpen(true)}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Create Persona
//           </Button>
//         </div>

//         {/* Stats */}
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

//         {/* Personas */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
//               Your Personas
//             </h2>
//             {!isLoading && personas.length > 0 && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => refetch()}
//                 className="flex gap-2"
//               >
//                 Refresh <RefreshCcw className="w-4 h-4" />
//               </Button>
//             )}
//           </div>

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <PersonaSkeleton key={i} idx={i} />
//               ))}
//             </div>
//           ) : personas.length === 0 ? (
//             <EmptyState />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {personas.map((persona) => (
//                 <PersonaCard key={persona.personaId} persona={persona} />
//               ))}
//             </div>
//           )}
//         </div>

//         <CreatePersonaModal />
//       </div>
//     </div>
//   );
// }

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

import { getAllPersona } from "@/lib/actions/persona";
import { DashboardStore } from "@/lib/types/Dashboard.types";
import { create } from "zustand";
import { Persona } from "@/lib/types/persona.types";
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
  session: any;
  initialPersonas: any[];
  fetchError?: boolean;
};

export default function DashboardClient({
  session,
  initialPersonas,
  fetchError,
}: DashboardClientProps) {
  const { setCreateModalOpen, formsFilledThisMonth, successRate } =
    useDashboardStore();
  const [userId] = useState(session.user.id);

  const {
    data: personas = [],
    isLoading,
    error,
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
    initialData: initialPersonas,
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  if (fetchError) {
    toast.error("Error loading personas from server");
  }

  return (
    <div className="min-h-screen dark:bg-neutral-900 bg-white p-6 transition-colors duration-300">
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
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Persona
          </Button>
        </div>

        {/* Stats */}
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

        {/* Personas */}
        <div className="mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
