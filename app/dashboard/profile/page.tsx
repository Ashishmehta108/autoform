"use client";
import ProfileCard from "@/components/dashboard/ProfileCard";
import { useUserStore } from "@/store/state";
import { useSession } from "next-auth/react";

export default function Profile() {
  const user = useUserStore();
  return (
    <ProfileCard
      user={{
        email: user.email,
      }}
    />
  );
}
