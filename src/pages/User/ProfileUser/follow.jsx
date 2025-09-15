import { useEffect, useState } from "react";

function FollowUser({user}) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(user.isFollowing);
  }, [user]);

  return (
    <div>
      <button>
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default FollowUser;