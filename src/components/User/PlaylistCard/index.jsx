import { resizeImage } from "@/helpers";
import { PlayIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PlaylistCard({ playlist }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full">
        <div className="w-full rounded-sm overflow-hidden relative group"
          onClick={() => {
            navigate(`/playlist/${playlist.slug}`);
          }}
        >
          <img src={resizeImage(playlist.thumbnail, 300)} alt={playlist.title}
            className="object-cover aspect-square 
                group-hover:scale-105 group-hover:brightness-65 transition-all duration-300"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      p-2 rounded-full border border-primary hover:border-[var(--main-green)] hover:text-[var(--main-green)] hover:[&>svg]:fill-[var(--main-green)]"
          >
            <PlayIcon className="w-10 h-10" strokeWidth={1} fill="var(--primary)" />
          </div>
        </div>
        <h5 className="mt-3 cursor-pointer hover:text-[var(--main-green)] transition-all duration-300"
          onClick={() => {
            navigate(`/playlist/${playlist.slug}`);
          }}
        >{playlist.title}</h5>
      </div>
    </>
  )
}

export default PlaylistCard