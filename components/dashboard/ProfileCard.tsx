import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Activity } from "lucide-react";

type user = {
  email: string;
};
const ProfileCard = ({ user }: { user: user }) => (
  <Card className="w-full max-w-md">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold">User Profile</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-3">
        <User className="h-4 w-4 text-yellow-600" />
        <span className="text-sm font-medium">{user.email.split("@")[0]}</span>
      </div>
      <div className="flex items-center space-x-3">
        <Mail className="h-4 w-4 text-yellow-600" />
        <span className="text-sm text-gray-600">{user.email}</span>
      </div>
      <div className="flex items-center space-x-3">
        <Activity className="h-4 w-4 text-yellow-600" />
        <Badge
          variant={"active" === "active" ? "default" : "secondary"}
          className={
            "active" === "active"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : ""
          }
        >
          active
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export default ProfileCard;
