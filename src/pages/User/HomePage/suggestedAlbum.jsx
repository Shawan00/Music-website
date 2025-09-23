import { Skeleton } from "@/components/ui/skeleton";
import { getSuggestedAlbum } from "@/services/Client/albumService";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import AlbumCard from "@/components/User/AlbumCard";
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from "@/helpers/animationVariant";

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
      <motion.section className="grid grid-cols-1"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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
              <motion.div variants={fadeIn.down}>
              <AlbumCard album={album} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>
    </>
  )
}

export default SuggestedAlbum;