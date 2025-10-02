("use client");

import { ReactNode, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "@/components/Loader/loader";

interface Props {
  children: ReactNode;
}

export function SessionProviderWrapper({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (session && (pathname === "/login" || pathname === "/signup")) {
      router.replace("/dashboard");
    }

    if (!session && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    }
  }, [session, status, pathname, router]);

  if (status === "loading") return <Loader />;

  return <SessionProvider>{children}</SessionProvider>;
}
