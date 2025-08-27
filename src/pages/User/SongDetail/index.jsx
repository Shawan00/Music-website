import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectSong } from "@/features/playerControl/playerControlSlice";
import { getSongBySlug } from "@/services/Client/songService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import LyricsTabs from "./lyricsTabs";
import InfoTab from "./infoTab";

function SongDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const song = useSelector(state => state.playerControl.song);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      const previousDisplay = footer.style.display;
      footer.style.display = "none";
      return () => {
        footer.style.display = previousDisplay;
      };
    }
  }, []);

  useEffect(() => {
    if (song && song.slug && song.slug !== slug) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("slug", song.slug);
        return next;
      }, { replace: true });
    }
  }, [song]);

  useEffect(() => {
    if (song && song.slug === slug) {
     return; 
    }

    const fetchSong = async () => {
      const response = await getSongBySlug(slug);

      if (response.status !== 200 || !response.data.data) {
        navigate("/404");
        return;
      }

      dispatch(selectSong(response.data.data));
      document.title = response.data.data.title + " - Listening to Music";
    }
    fetchSong();
  }, [])

  if (!song) {
    return (
      <div className="h-screen">
        <Skeleton className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto h-8 mb-5" />
        <div className="flex gap-4 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-2/3">
            <Skeleton className="w-full h-[300px] mb-4" />
            <Skeleton className="w-full h-8 mb-4" />
            <Skeleton className="w-full h-8 mb-4" />
            <Skeleton className="w-full h-8 mb-4" />
          </div>
          <div className="w-full lg:w-1/3">
            <Skeleton className="w-full h-[200px] lg:h-[500px] mb-4" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="song-detail-page h-full ">
      <Tabs defaultValue="lyrics" className="flex flex-col h-full">
        <TabsList className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="album">Album</TabsTrigger>
          <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="flex-1 overflow-auto hide-scrollbar">
          <InfoTab song={song} />
        </TabsContent>
        <TabsContent value="lyrics" className="flex-1 overflow-hidden">
          <LyricsTabs lyricsUrl={song.lyrics} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SongDetail