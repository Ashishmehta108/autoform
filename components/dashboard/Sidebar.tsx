"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Puzzle, History, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useUserStore } from "@/store/state";
import {
  Card,
  Chart,
  DocumentText,
  Home3,
  Profile2User,
  SidebarLeft,
  SidebarRight,
} from "iconsax-reactjs";

export default function AppSidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const { isMobile } = useSidebar();
  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(false);
    }
  }, []);

  const handleLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  const user = useUserStore();

  return (
    <div
      className={`transition-all hidden md:block   duration-500 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <Sidebar
        variant="sidebar"
        className={`bg-white w-16 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 
        border-r border-neutral-200 dark:border-neutral-800
        transition-all duration-500 ease-in-out overflow-hidden
        ${collapsed ? "w-16 items-center justify-center" : "w-64"}`}
      >
        <SidebarHeader className="flex items-center font-bold text-xl tracking-tight">
          <span
            className={`transition-all flex items-center gap-2 duration-300 ease-in-out transform w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            {!collapsed && (
              <Link href="/dashboard" className="block">
                AutoForm
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`cursor-pointer md:block hidden ${collapsed ? "" : "ml-auto"}`}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <SidebarRight className="h-6 w-6" />
              ) : (
                <SidebarLeft className="h-6 w-6" />
              )}
            </Button>
          </span>
        </SidebarHeader>

        <SidebarContent className="px-2 flex-1 overflow-y-auto">
          <SidebarMenu className="mb-4 space-y-1">
            {[
              { href: "/dashboard", icon: Home3, label: "Home" },
              { href: "/dashboard/forms", icon: DocumentText, label: "Forms" },
              {
                href: "/dashboard/personas",
                icon: Profile2User,
                label: "Personas",
              },
              { href: "/dashboard/analytics", icon: Chart, label: "Analytics" },
              {
                href: "/dashboard/integrations",
                icon: Puzzle,
                label: "Integrations",
              },
            ].map(({ href, icon: Icon, label }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  className={`transition-all duration-300 ${
                    collapsed
                      ? "w-full justify-center mx-auto"
                      : "justify-start px-2"
                  }`}
                >
                  <Link
                    href={href}
                    className={`flex items-center transition-all duration-300 ${
                      collapsed ? "justify-center " : "justify-start gap-2"
                    }`}
                  >
                    <Icon
                      className="w-6 h-6 flex justify-center"
                      strokeWidth={1.5}
                    />
                    <span
                      className={`transition-all duration-300 ease-in-out transform ${
                        collapsed
                          ? "opacity-0 hidden -translate-x-5 pointer-events-none"
                          : "opacity-100 block translate-x-0"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/logs"
                  className={`flex items-center gap-2 ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <History className="w-6 h-6" strokeWidth={1.5} />
                  <span
                    className={`transition-all duration-300 ease-in-out transform ${
                      collapsed
                        ? "opacity-0 hidden -translate-x-2 pointer-events-none"
                        : "opacity-100 block translate-x-0"
                    }`}
                  >
                    Usage Logs
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/dashboard/billing"
                  className={`flex items-center gap-2 ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <Card className="w-6 h-6" />
                  <span
                    className={`transition-all duration-300 ease-in-out transform ${
                      collapsed
                        ? "opacity-0 hidden -translate-x-2 pointer-events-none"
                        : "opacity-100 block translate-x-0"
                    }`}
                  >
                    Billing
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-neutral-200 dark:border-neutral-800 p-2">
          <SidebarGroup className="flex flex-col items-center">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-2 rounded-md justify-center"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image} alt="@user" />
                <AvatarFallback>
                  <div>{user?.email[0]?.toUpperCase()}</div>
                </AvatarFallback>
              </Avatar>
              <div
                className={`transition-all duration-300 ease-in-out transform ${
                  collapsed
                    ? "opacity-0 hidden -translate-x-2 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <span className="text-sm font-medium">Ashish Dev</span>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </span>
              </div>
            </Link>
            <Button
              variant="default"
              size="sm"
              className="w-full justify-center  cursor-pointer mt-2"
              onClick={handleLogout}
            >
              <LogOut className="w-10 h-10" />
              <span
                className={`transition-all duration-300 ease-in-out transform ${
                  collapsed
                    ? "opacity-0 hidden -translate-x-2 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                Sign Out
              </span>
            </Button>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
