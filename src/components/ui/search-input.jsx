import { useIsMobile } from "@/hooks/use-mobile";
import { getSearch } from "@/services/Client/generalService";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import ArtistUrl from "../User/ArtistUrl";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getAvatarFallback, resizeImage } from "@/helpers";
import { useNavigate } from "react-router-dom";

function SearchInput(props) {
  const { placeholder, isOpen, setIsOpen } = props;
  const isMobile = useIsMobile();
  const [searchResult, setSearchResult] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const debounceSearchRef = useRef();

  useEffect(() => {
    setSearchResult(null);
    debounceSearchRef.current = debounce(async (keyword) => {
      const res = await getSearch(keyword);
      if (res.status === 200) {
        setSearchResult(res.data);
      } else {
        setSearchResult({
          error: true,
          message: res.data.message
        })
      }
    }, 600);
    return () => {
      debounceSearchRef.current.cancel();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const keyword = e.target.value;
    if (keyword.length === 0) {
      debounceSearchRef.current.cancel();
      setSearchResult(null);
    }
    else {
      setSearchResult("searching");
      debounceSearchRef.current(keyword);
    }
  }

  const input = () => {
    return (
      <div className="space-y-1 relative">
        <div className="bg-background flex flex-row items-center gap-2 sm:gap-4 py-2 px-4 border-2 border-border rounded-full">
          <Search />
          <input
            placeholder={placeholder}
            className="w-full"
            onChange={handleChange}
            ref={inputRef}
          />
          <X className="cursor-pointer" onClick={() => {
            setSearchResult(null);
            inputRef.current.value = "";
          }} />
        </div>
        {searchResultComponent()}
      </div>
    )
  }

  const searchResultComponent = () => {
    if (!searchResult) return null;
    if (searchResult === "searching") return (
      <div className="bg-muted w-full max-h-100 px-3 py-2 rounded-lg absolute top-12">
        Searching...
      </div>
    );
    if (searchResult.error) return (
      <p className="bg-muted w-full max-h-100 px-3 py-2 rounded-lg absolute top-12">
        {searchResult.message}
      </p>
    );
    if (searchResult.songs.length === 0 && searchResult.albums.length === 0 && searchResult.artists.length === 0) return (
      <p className="bg-muted w-full max-h-100 px-3 py-2 rounded-lg absolute top-12">
        No results found
      </p>
    )

    return (
      <div className="bg-muted w-full max-h-100 px-3 pt-2 py-4 rounded-lg absolute top-12 overflow-auto space-y-2">
        {searchResult.songs.length > 0 && (
          <section className="pb-2 sm:pb-4">
            <div className="w-full text-sm font-semibold border-b border-border pb-2">Songs</div>
            <div className="space-y-2 mt-3">
              {searchResult.songs.map((song) => (
                <div key={song._id} className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => navigate(`/listen?slug=${song.slug}`)}
                >
                  <div className="w-12 rounded-xs overflow-hidden">
                    <img src={song.thumbnail} alt={song.title} className="w-full aspect-square object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 group-hover:text-[var(--logo-color)]">{song.title}</p>
                    <ArtistUrl artistId={song.artistId} collaborationArtistIds={song.collaborationArtistIds} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {searchResult.artists.length > 0 && (
          <section>
            <div className="w-full text-sm font-semibold border-b border-border pb-2">Artists</div>
            <div className="space-y-2 mt-3">
              {searchResult.artists.map((artist) => (
                <div key={artist._id} className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => navigate(`/profile/${artist._id}`)}
                >
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src={resizeImage(artist.avatar || "", 48)} />
                    <AvatarFallback>{getAvatarFallback(artist.fullName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="line-clamp-1 group-hover:text-[var(--logo-color)]">{artist.fullName}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {searchResult.albums.length > 0 && (
          <section>
            <div className="w-full text-sm font-semibold border-b border-border pb-2">Albums</div>
            <div className="space-y-2 mt-3">
              {searchResult.albums.map((album) => (
                <div key={album._id} className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => navigate(`/album/${album._id}`)}
                >
                  <div className="w-12 rounded-xs overflow-hidden">
                    <img src={album.thumbnail} alt={album.title} className="w-full aspect-square object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 group-hover:text-[var(--logo-color)]">{album.title}</p>
                    <ArtistUrl artistId={album.idArtist} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  }

  return isMobile ? (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen} className="relative">
        <DialogContent className="border-none p-0 absolute top-1/5 bg-transparent"
          showCloseButton={false}
        >
          <DialogHeader>
            <div className="hidden">
              <DialogTitle>Search Results</DialogTitle>
            </div>
          </DialogHeader>
          {input()}
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      {input()}
    </>
  );
}

export default SearchInput