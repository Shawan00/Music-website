import { Slider } from '@/components/ui/slider';
import { playNextSong } from '@/features/playerControl/playerControlSlice';
import { formatTimeMinute } from '@/helpers';
import eventBus from '@/helpers/eventBus';
import { sendPlayedHistory } from '@/services/Client/songService';
import { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';

const ProgressBar = forwardRef((props, ref) => {
  const { id, src, setPlayingState, volume } = props;
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isDragging = useRef(false);
  const isPlaying = useRef(true);
  const listeningTime = useRef(0);
  const startListeningTime = useRef(null);
  const dispatch = useDispatch();
  
  const updateCurrentTime = () => { // cập nhật thanh tiến trình khi audio chạy
    if (!isDragging.current) { // không thực hiện cập nhật thanh tiến trình khi đang tua
      const audio = audioRef.current
      eventBus.emit('timeUpdate', audio.currentTime)
      setCurrentTime(audio.currentTime)
    }
  }

  useEffect(() => { //thêm sự kiện play/pause, cập nhật thanh tiến trình
    const audio = audioRef.current;
    const handleLoadedMetadata = () => {
      startListeningTime.current = Date.now();
      audio.play().catch(() => {
        startListeningTime.current = null;
        isPlaying.current = false;
        setPlayingState(false)
      });
      audio.muted = false;
      setDuration(audio.duration);
    }

    const handlePlay = () => {
      startListeningTime.current = Date.now();
      isPlaying.current = true
      setPlayingState(true)
    }

    const handlePause = () => {
      isPlaying.current = false
      listeningTime.current += Date.now() - startListeningTime.current;
      setPlayingState(false)
    }

    const handleEnded = () => {
      listeningTime.current += Date.now() - startListeningTime.current;
      if (!audio.loop) dispatch(playNextSong());
    }

    const handleSeekForEvent = (time) => {
      try {
        if (!audioRef.current) return;
        isDragging.current = true;

        audioRef.current.currentTime = time;
        setCurrentTime(time);

        if (!isPlaying.current) {
          audioRef.current.play().catch(error => {
            console.error("Play error:", error);
            setPlayingState(false)
            isPlaying.current = false
          });
        }

        setTimeout(() => {
          isDragging.current = false;
        }, 100);

      } catch (error) {
        console.error("Seek error:", error);
        isDragging.current = false;
      }
    };

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    eventBus.on('clickLyrics', handleSeekForEvent);
    //clean up
    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      eventBus.off('clickLyrics', handleSeekForEvent);
    }
  }, [])

  useEffect(() => { //cập nhật volume
    const audio = audioRef.current;
    audio.volume = volume / 100;
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current;
    const handleSendPlayedHistory = async () => {
      const playDuration = Math.floor(listeningTime.current / 1000);
      listeningTime.current = 0;
      if (playDuration > 0) {
        await sendPlayedHistory(id, {
          playDuration,
          isCompleted: playDuration >= duration
        })
      }
    }

    audio.addEventListener('ended', handleSendPlayedHistory);

    return () => {
      audio.removeEventListener('ended', handleSendPlayedHistory);
    }
  }, [duration, id])

  useEffect(() => {
    if (startListeningTime.current) {
      listeningTime.current = 0;
    }
  }, [id])

  //xử lý tua nhạc
  const handleSeek = (value) => {
    isDragging.current = true;
    setCurrentTime(value[0]);
  }

  const handleDragStart = () => {
    isDragging.current = true
  }

  const handleDragEnd = () => {
    const audio = audioRef.current;
    audio.currentTime = currentTime;
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
    toggleRepeat() { // xử lý lặp lại
      const audio = audioRef.current
      audio.loop = !audio.loop;
      return audio.loop
    },
    audioLoopState() { //trả về trạng thái lặp lại
      const audio = audioRef.current
      return audio.loop
    },
    async handleSendPlayedHistory() { //gửi lịch sử nghe nhạc
      listeningTime.current += isPlaying.current ? Date.now() - startListeningTime.current : 0;
      const playDuration = Math.floor(listeningTime.current / 1000);
      listeningTime.current = 0;
      if (playDuration > 0) {
        await sendPlayedHistory(id, {
          playDuration,
          isCompleted: playDuration >= duration
        })
      }
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
        autoPlay muted
      ></audio>
      <div className="CurrentTime-bar flex items-center justify-center w-full">
        <span className='minute-second'>{formatTimeMinute(currentTime)}</span>
        <Slider
          defaultValue={[0]}
          value={[currentTime]}
          max={duration}
          step={0.1}
          onPointerDown={handleDragStart}
          onPointerUp={handleDragEnd}
          onValueChange={handleSeek}
          className={`w-8/10 sm:w-90 lg:w-80 xl:w-90 mx-2`}
        />
        <span className="minute-second">{formatTimeMinute(duration)}</span>
      </div>

    </>
  );
});

export default ProgressBar