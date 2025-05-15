import { formatTimeMinute } from '@/helpers';
import {forwardRef, useRef, useEffect, useState, useImperativeHandle} from 'react';

const ProgressBar = forwardRef((props, ref) => {
  const {src, setPlayingState, volume} = props;
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isDragging = useRef(false);
  const isPlaying = useRef(true);

  const updateCurrentTime = () => { // cập nhật thanh tiến trình khi audio chạy
    if (!isDragging.current) { // không thực hiện cập nhật thanh tiến trình khi đang tua
      const audio = audioRef.current
      setCurrentTime(audio.currentTime)
    }
  }

  useEffect(() => { //thêm sự kiện play/pause, cập nhật thanh tiến trình
    const audio = audioRef.current;
    const handleLoadedMetadata = () => {
      audio.muted = false;
      audio.play;
      setDuration(audio.duration);
    }

    const handlePlay = () => {
      isPlaying.current = true
      setPlayingState(true)
    }

    const handlePause = () => {
      isPlaying.current = false
      setPlayingState(false)
    }
    
    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    //clean up
    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    }
  }, [])

  useEffect(() => { //cập nhật volume
    const audio = audioRef.current;
    audio.volume = volume / 100;
  },[volume])
  
  //xử lý việc tua nhạc
  const handleSeek = (e) => {
    isDragging.current = true;
    setCurrentTime(e.target.value);
  }

  const handleDragStart = () => {
    isDragging.current = true
  }

  const handleDragEnd = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    isDragging.current = false
  }

  //component cha có thể gọi các hàm này
  useImperativeHandle(ref, () => ({
    togglePlay() { //xử lý play/pause
      const audio = audioRef.current
      if (isPlaying.current) {
        audio.pause()
      } else {
        audio.play().catch(error => {
          console.log("Error with playing:", error);
        })
      }
      return isPlaying.current
    },
    cleanup() { //xoá media session khi tắt nhạc
      const audio = audioRef.current
      audio.pause()
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
    }
  }))

  return (
    <>
      <audio 
        ref={audioRef} src={src}
        className='hidden'
        controls preload="metadata" 
        autoPlay muted ></audio>
      <div className="CurrentTime-bar">
        <span className='minute-second'>{formatTimeMinute(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        ></input>
        <span className="minute-second">{formatTimeMinute(duration)}</span>
      </div>
    </>
  );
});

export default ProgressBar