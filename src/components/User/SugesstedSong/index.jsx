import { useEffect, useState } from 'react'
import { getSuggestedSongs } from '../../../services/Client/songService';
import { Skeleton } from '@/components/ui/skeleton';
import SongItem from '@/pages/User/HomePage/songItem';
import { removeDuplicatesById } from '@/helpers';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/helpers/animationVariant';
import SuggesstedArtist from '@/pages/User/HomePage/suggesstedArtist';

function SugesstedSong() {
  const [sugesstedSongs, setSuggesstedSong] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getSuggestedSongs({
        type: "hybrid",
        limit: 6  
      });
      setSuggesstedSong(removeDuplicatesById(response.data.recommendations));
    }
    getData();
  }, [])

  return sugesstedSongs ? (
    <>
      <motion.div className='sugessted-song mb-5'
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {sugesstedSongs.map((item) => (
          <motion.div
            variants={fadeIn.down}
            key={item._id}
          >
            <SongItem item={item}/>
          </motion.div>
        ))}
      </motion.div>

      <SuggesstedArtist />
    </>
  ) : (
    <div className='sugessted-song'>
      <Skeleton className="h-18" />
      <Skeleton className="h-18" />
      <Skeleton className="h-18" />
      <Skeleton className="h-18" />
      <Skeleton className="h-18" />
      <Skeleton className="h-18" />
    </div>
  );
}

export default SugesstedSong