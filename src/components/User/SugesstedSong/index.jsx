import { useEffect, useState } from 'react'
import { getSuggestedSongs } from '../../../services/Client/songService';
import { Skeleton } from '@/components/ui/skeleton';
import SongItem from '@/pages/User/HomePage/songItem';

function SugesstedSong() {
  const [sugesstedSongs, setSuggesstedSong] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getSuggestedSongs({
        type: "hybrid",
        limit: 6
      });
      setSuggesstedSong(response.data.recommendations);
    }
    getData();
  }, [])

  return sugesstedSongs ? (
    <>
      <div className='sugessted-song mb-5'>
        {sugesstedSongs.map((item) => (
          <SongItem key={item._id} item={item}/>
        ))}
      </div>
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