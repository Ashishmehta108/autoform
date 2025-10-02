"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUserStore } from "@/store/state";
import { useRouter } from "next/navigation";
import { Toaster } from "./ui/sonner";
function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user &&
      !location.href.startsWith("dashboard")
    ) {
      setUser(
        session.user.id || "",
        session.user.email || "",
        session.user.image || ""
      );
    }
  }, [session, status]);

  if (status === "loading") {
    return <Loader />;
  }
  return <>{children}</>;
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./Loader/loader";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
