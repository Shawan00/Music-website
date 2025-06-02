import { useEffect, useState } from 'react'
import { getSuggestedSongs } from '../../../services/User/userService';
import { resizeImage } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectSong } from '../../../features/playerControl/playerControlSlice';
import Marker from '../Marker';
import { Ellipsis, EllipsisVertical } from 'lucide-react';

function SugesstedSong() {
  const [sugesstedSongs, setSuggesstedSong] = useState(null);
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.playerControl.song);
  console.log(currentSong);

  useEffect(() => {
    const getData = async () => {
      const response = await getSuggestedSongs();
      setSuggesstedSong(response.data.data);
    }
    getData();
  },[])

  return sugesstedSongs ? (
    <>
      <div className='sugessted-song'>
        {sugesstedSongs.map((item, index) => (
          <div 
            className={`song-item ${item._id === currentSong?._id ? "active" : ""}`} 
            key={index} 
            onClick={() => dispatch(selectSong(item))}
          >
            <div className='image'>
              <img src={resizeImage(item.thumbnail, 60)} alt={item.title}></img>
            </div>
            <div className='info'>
              <span className='title'>{item.title}</span>
              <span className='artist'>artist</span>
            </div>
            {item._id === currentSong?._id && (
              <Marker />
            )}
            <div className="options">
              <EllipsisVertical strokeWidth={1.5} size={20} />
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}

export default SugesstedSong