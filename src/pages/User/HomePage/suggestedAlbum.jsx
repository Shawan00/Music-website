import { Skeleton } from "@/components/ui/skeleton";
import { getSuggestedAlbum } from "@/services/Client/albumService";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import AlbumCard from "@/components/User/AlbumCard";

function SuggestedAlbum() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await getSuggestedAlbum()
      if (res.status === 200) {
        setAlbums(res.data.albumRecommendations)
      } else {
        setAlbums([])
      }
    }
    fetchAlbums()
  }, [])

  if (!albums) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
    </div>
  )

  if (albums.length === 0) return null

  return (
    <>
      <h2>Albums shared with you</h2>
      <section className="grid grid-cols-1">
        <Swiper
          loop={true}
          className='block w-full mb-5'
          spaceBetween={16}
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
          {albums.map((album) => (
            <SwiperSlide key={album._id}>
              <AlbumCard album={album} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}

export default SuggestedAlbum;