import { resizeImage } from "@/helpers";
import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="w-full group cursor-pointer"
        onClick={() => navigate(`/album/${album._id}`)}
      >
        <div className="w-full rounded-sm overflow-hidden flex items-center justify-center">
          <img src={resizeImage(album.thumbnail, 200)} alt={album.title}
            className="w-full aspect-square object-cover hover:brightness-70 hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-sm sm:text-base font-medium truncate group-hover:text-[var(--logo-color)] mb-0">{album.title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground truncate">{album.idArtist.fullName}</p>
        </div>
      </div>
    </>
  )
}

export default AlbumCard;