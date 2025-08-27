import EditProfile from "@/pages/User/Profile/edit";

function VerifyArtist({profile}) {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2>You are not verified</h2>
      <p className="text-muted-foreground">Please fill out and submit your profile information to unlock all features.</p>
      <EditProfile profile={profile} toVerify={true} />
    </div>
  )
}

export default VerifyArtist;