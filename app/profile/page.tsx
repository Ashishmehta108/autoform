"use client";

import { useUserStore } from "@/store/state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import ProfileSkeleton from "@/components/ProfileSkeleton";

const Profile = () => {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);
  const { userId, email, image } = useUserStore();
  if (!isMounted) return <ProfileSkeleton />;
  return (
    <Card className="max-w-sm mx-auto mt-6 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image || ""} alt="profile" />
            <AvatarFallback>{email?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">Profile</CardTitle>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-medium text-muted-foreground">User ID:</span>{" "}
          {userId}
        </p>
        <p>
          <span className="font-medium text-muted-foreground">Email:</span>{" "}
          {email}
        </p>
      </CardContent>
    </Card>
  );
};

export default Profile;
