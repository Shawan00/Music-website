import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/auth.context"
import { getAvatarFallback, resizeImage } from "@/helpers";
import { Dot } from "lucide-react";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import EditProfile from "./edit";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  document.title = "Profile | Music App";

  if (!user) {
    navigate("/login");
    return;
  }

  return (
    <>
      <section className="flex flex-col sm:flex-row gap-3 sm:gap-6 my-4 p-5 bg-linear-to-b from-[var(--green-bg)]/40 to-background rounded-lg">
        <Avatar className="size-35 sm:size-50">
          <AvatarImage src={resizeImage(user.userInfo.avatar || "", 200)} />
          <AvatarFallback className="text-xl sm:text-4xl">{getAvatarFallback(user.userInfo.fullName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-2 sm:gap-3 sm:self-end">
          <p className="font-medium">Profile</p>
          <h1>{user.userInfo.fullName}</h1>
          <div className="flex items-center gap-1 font-medium">
            <span>6 followers</span>
            <Dot />
            <span>10 following</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 mb-5">
        <Card className="col-span-1 h-fit bg-muted rounded-sm">
          <CardHeader className="font-bold text-lg">Infomation</CardHeader>
          <CardContent>
            <h5>Email</h5>
            <p className="text-muted-foreground mb-3">{user.userInfo.email}</p>
            <h5>Phone</h5>
            <p className="text-muted-foreground mb-3">{user.userInfo.phone || "No phone number"}</p>
            <h5>Gender</h5>
            <p className="text-muted-foreground mb-3 capitalize">{user.userInfo.gender}</p>
            <h5>Biography</h5>
            <p className="text-muted-foreground mb-3">{user.userInfo.bio || "No biography"}</p>
            <h5>Country</h5>
            <p className="text-muted-foreground mb-3">{user.userInfo.country || "No country specified"}</p>
            <EditProfile profile={user.userInfo}/>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 h-fit bg-muted rounded-sm">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Your Playlists</h2>

            <h2 className="text-xl font-bold mb-2">Following</h2>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export default Profile