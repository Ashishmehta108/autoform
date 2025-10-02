"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/Sidebar";
import { ModeToggle } from "@/components/ModeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 dark:bg-neutral-900 w-full overflow-y-auto  bg-white ">
          <div className="flex items-center justify-between sticky dark:bg-neutral-900/90 backdrop-blur-xs z-50 px-4  p-2 top-0">
            <SidebarTrigger className="md:hidden" />
            <div></div>
            <ModeToggle  />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
