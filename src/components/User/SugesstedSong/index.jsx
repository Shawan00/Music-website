import { useEffect, useState } from 'react'
import { getSuggestedSongs } from '../../../services/Client/songService';
import { resizeImage } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectSong } from '../../../features/playerControl/playerControlSlice';
import Marker from '../Marker';
import SongOptions from '../SongOptions';
import { Skeleton } from '@/components/ui/skeleton';
import ArtistUrl from '../ArtistUrl';

function SugesstedSong() {
  const [sugesstedSongs, setSuggesstedSong] = useState(null);
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.playerControl.song);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getSuggestedSongs();
      setSuggesstedSong(response.data.data.slice(0, 6));
    }
    getData();
  }, [])

  return sugesstedSongs ? (
    <>
      <div className='sugessted-song mb-5'>
        {sugesstedSongs.map((item, index) => (
          <div
            className={`song-item ${item._id === currentSong?._id ? "active" : item._id === selectedSong?._id ? "bg-muted" : ""}`}
            key={index}
            onClick={() => dispatch(selectSong(item))}
          >
            <div className='image w-15'>
              <img src={resizeImage(item.thumbnail, 60)} alt={item.title}></img>
            </div>
            <div className='info flex-1 truncate'>
              <span className='title'>{item.title}</span>
              <ArtistUrl artistId={item.artistId} collaborationArtistIds={item.collaborationArtistIds} />
            </div>
            {item._id === currentSong?._id && (
              <Marker />
            )}
            <div className={`options ${selectedSong?._id === item._id ? "visible" : ""}`}
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={() => setSelectedSong(item)}
              onMouseLeave={() => setSelectedSong(null)}
            >
              <SongOptions song={item} />
            </div>
          </div>
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