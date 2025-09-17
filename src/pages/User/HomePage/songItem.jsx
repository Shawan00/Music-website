import { resizeImage } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectSong } from '../../../features/playerControl/playerControlSlice';
import { useState } from "react";
import ArtistUrl from '@/components/User/ArtistUrl';
import Marker from '@/components/User/Marker';
import SongOptions from '@/components/User/SongOptions';
import { useIsTablet } from '@/hooks/use-tablet';

function SongItem({ item }) {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.playerControl.song);
  const [selectedSong, setSelectedSong] = useState(null);
  const tablet = useIsTablet();

  return (
    <div
      className={`flex-1 song-item ${item._id === currentSong?._id ? "active" : item._id === selectedSong?._id ? "bg-muted" : ""}`}
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
      <div className={`options ${tablet || selectedSong?._id === item._id ? "visible" : ""}`}
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
  )
}

export default SongItem;