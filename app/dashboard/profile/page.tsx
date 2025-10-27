"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  const { data } = useSession();
  console.log(data);
  if (!isMounted) return <ProfileSkeleton />;
  return (
    <Card className="max-w-sm mx-auto mt-6 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={data?.user?.image || ""} alt="profile" />
            <AvatarFallback>
              {data?.user?.email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">Profile</CardTitle>
            <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Profile;
