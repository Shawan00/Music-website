import { Skeleton } from "@/components/ui/skeleton";
import { getSuggestedArtists } from "@/services/Client/userArtistService";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/helpers";
import { useNavigate } from "react-router-dom";

function SuggesstedArtist() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      const res = await getSuggestedArtists({
        page: 1,
        limit: 12
      })
      if (res.status === 200) {
        setArtist(res.data.artistRecommendations)
      } else {
        setArtist([])
      }
    }
    fetchArtist()
  }, [])

  if (!artist) return (
    <Skeleton className="w-full h-30 mb-5" />
  )

  if (artist.length === 0) return (
    <div className="text-center italic text-muted-foreground mb-5">No artist suggested</div>
  )

  return (
    <section className="mb-5 grid grid-cols-1">
      <Swiper
        loop={true}
        className='block w-full'
        spaceBetween={12}
        slidesPerView={2}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          425: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 6,
          }
        }}
      >
        {artist.map((item) => (
          <SwiperSlide key={item._id}
            className="cursor-pointer"
            onClick={() => navigate(`/profile/${item._id}`)}
          >
            <Avatar className="w-full h-auto aspect-square mb-2">
              <AvatarImage src={item.avatar}/>
              <AvatarFallback>{getAvatarFallback(item.fullName)}</AvatarFallback>
            </Avatar>
            <p className="font-semibold truncate text-center">{item.fullName}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )

}

export default SuggesstedArtist