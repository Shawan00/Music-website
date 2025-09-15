import { Skeleton } from "@/components/ui/skeleton";
import { getMyAlbums } from "@/services/Client/albumService";
import { useContext, useEffect, useState } from "react";
import AlbumForm from "./albumForm";
import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { resizeImage } from "@/helpers";
import DeleteAlbum from "./delete";
import { AuthContext } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";
import VerifyArtist from "@/components/User/VerifyArtist";

function ArtistAlbum() {
  const [albums, setAlbums] = useState(null);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    document.title = "Album - Artist Studio";
    const fetchAlbums = async () => {
      const res = await getMyAlbums();
      if (res.status === 200) {
        setAlbums(res.data.albums.reverse());
      } else {
        setAlbums([])
      }
    }
    fetchAlbums()
  }, [])

  if (!user.userInfo.verifyArtist) {
    return <VerifyArtist profile={user.userInfo} />;
  }
  
  if (!albums) return (
    <>
      <h2>Your albums</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Skeleton className="w-full aspect-2/1" />
        <Skeleton className="w-full aspect-2/1" />
        <Skeleton className="w-full aspect-2/1" />
        <Skeleton className="w-full aspect-2/1" />
        <Skeleton className="w-full aspect-2/1" />
        <Skeleton className="w-full aspect-2/1" />
      </div>
    </>
  )

  return (
    <>
      <section className="flex justify-between">
        <h2>Your albums</h2>
        <AlbumForm setAlbums={setAlbums} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 flex-1">
        {albums.length > 0 ? albums.map(album => (
          <Card key={album._id} className="h-fit">
            <CardContent className="flex gap-2 sm:gap-4">
              <div className="size-35 rounded-sm overflow-hidden">
                <img 
                  src={resizeImage(album.thumbnail || "", 140)} 
                  alt={album.title} 
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="line-clamp-2 mb-2">{album.title}</h3>
                  <p className="text-muted-foreground">{album.songCount || 0} {album.songCount > 1 ? "songs" : "song"}</p>
                </div>
                <div className="flex gap-3 justify-end">
                  <AlbumForm album={album} setAlbums={setAlbums} />
                  <DeleteAlbum albumId={album._id} setAlbums={setAlbums} />
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full self-center text-center">
            <DotLottieReact
              src="https://lottie.host/b84dc140-256a-4180-a86e-6cba7543e18c/jJZEe9khfg.lottie"
              loop autoplay
              className="w-100 sm:w-150 aspect-ratio-2/1 mx-auto"
            />
            <p className="text-lg font-bold">You haven&apos;t created any albums yet</p>
          </div>
        )}
      </section>
    </>
  )
}

export default ArtistAlbum;
