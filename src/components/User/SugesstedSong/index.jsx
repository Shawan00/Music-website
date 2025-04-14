import { useEffect, useState } from 'react'
import { getSuggestedSongs } from '../../../services/User/userService';
import { resizeImage } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { selectSong } from '../../../features/playerControl/playerControlSlice';

function SugesstedSong() {
  const [sugesstedSongs, setSuggesstedSong] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const response = await getSuggestedSongs();
      setSuggesstedSong(response.data.data);
    }
    getData();
  },[])

  return sugesstedSongs ? (
    <>
      <div className='suggested-song'>
        {sugesstedSongs.map((item, index) => (
          <div className='song-item' key={index} onClick={() => dispatch(selectSong(item))}>
            <div className='image'>
              <img src={resizeImage(item.thumbnail, 60)} alt={item.title}></img>
            </div>
            <div className='info'>
              <span className='title'>{item.title}</span>
              <span className='artist'>artist</span>
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