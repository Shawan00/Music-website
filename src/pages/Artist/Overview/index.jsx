import VerifyArtist from "@/components/User/VerifyArtist";
import { AuthContext } from "@/context/auth.context";
import { formatNumberWithDots } from "@/helpers";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Overview() {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  if (!user.userInfo.verifyArtist) {
    return <VerifyArtist profile={user.userInfo} />;
  }

  return (
    <div>
      <h1 className="mb-3 sm:mb-5">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="p-2 sm:p-4 border border-border rounded-lg shadow-sm">
          <h3>Total Streams</h3>
          <p className="text-right text-lg sm:text-xl font-semibold">{formatNumberWithDots(10000000)}</p>
        </div>
        <div className="p-2 sm:p-4 border border-border rounded-lg shadow-sm">
          <h3>Monthly listeners</h3>
          <p className="text-right text-lg sm:text-xl font-semibold">{formatNumberWithDots(100000)}</p>
        </div>
        <div className="p-2 sm:p-4 border border-border rounded-lg shadow-sm">
          <h3>Songs</h3>
          <p className="text-right text-lg sm:text-xl font-semibold">{formatNumberWithDots(420)}</p>
        </div>
        <div className="p-2 sm:p-4 border border-border rounded-lg shadow-sm">
          <h3>Albums</h3>
          <p className="text-right text-lg sm:text-xl font-semibold">{formatNumberWithDots(7)}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
