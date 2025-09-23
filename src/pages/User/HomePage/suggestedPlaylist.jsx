import { Skeleton } from "@/components/ui/skeleton";
import PlaylistCard from "@/components/User/PlaylistCard";
import { getSuggestedPlaylist } from "@/services/Client/playlistService";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from "@/helpers/animationVariant";

function SuggestedPlaylist() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const getPlaylists = async () => {
      const response = await getSuggestedPlaylist();
      if (response.status === 200) {
        setPlaylists(response.data.playlistRecommendations);
      } else {
        setPlaylists([]);
      }
    }
    getPlaylists();
  }, [])

  if (!playlists) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
      <Skeleton className="w-full aspect-9/10" />
    </div>
  )

  if (playlists.length === 0) return null

  return (
    <>
      <h2>Playlists shared with you</h2>
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
          {playlists.map((playlist) => (
            <SwiperSlide key={playlist._id}>
              <motion.div variants={fadeIn.up}>
                <PlaylistCard playlist={playlist} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>
    </>
  )
}

export default SuggestedPlaylist;