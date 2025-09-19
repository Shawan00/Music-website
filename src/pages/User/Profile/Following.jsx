import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarFallback, resizeImage } from "@/helpers";
import { getFollowingArtist } from "@/services/Client/userArtistService";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Following() {
  const [artists, setArtists] = useState(null)

  useEffect(() => {
    const fetchArtist = async () => {
      const res = await getFollowingArtist();
      if (res.status === 200) {
        setArtists(res.data.artists)
      } else setArtists([])
    }
    fetchArtist()
  }, [])

  if (!artists) return (
    <Skeleton className="w-full h-20" />
  )
  if (artists.length === 0) return (
    <p className="text-center text-muted-foreground">You haven&apos;t followed any artists yet</p>
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-3">
      {artists.map(artist => (
        <Link key={artist._id}
          className="cursor-pointer w-full flex flex-col items-center"
          to={`/profile/${artist._id}`}
        >
          <Avatar className="w-full h-auto aspect-square">
            <AvatarImage src={resizeImage(artist.avatar || "", 180)} />
            <AvatarFallback>
              {getAvatarFallback(artist.fullName)}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold truncate text-center">{artist.fullName}</p>
        </Link>
      ))}
    </div>
  )
}

export default Following