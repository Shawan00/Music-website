import { Skeleton } from "@/components/ui/skeleton";
import { parseLRC } from "@/helpers";
import eventBus from "@/helpers/eventBus";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

function LyricsTabs({ lyricsUrl }) {
  const [lyrics, setLyrics] = useState(null);
  const [currentLine, setCurrentLine] = useState(-1);
  const [error, setError] = useState(null);

  useEffect(() => { // lấy lyrics từ lyricsUrl
    if (!lyricsUrl) {
      setError("Sorry! Lyrics is not provided");
      return;
    }

    const fetchLyrics = async () => {
      try {
        const response = await fetch(lyricsUrl);
        if (!response.ok) {
          setError("Sorry! Lyric is not available");
          return
        }
        const lrcText = await response.text();
        const parsedLyrics = parseLRC(lrcText);
        setLyrics(parsedLyrics);
        setError(null);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
        setError("Sorry! Failed to get lyrics");
      }
    };

    fetchLyrics()
  }, [lyricsUrl]);

  useEffect(() => { //đồng bộ lyric với audio
    if (!lyrics)
      return

    const handleTimeUpdate = (currentTime) => {
      let newLine = -1;
      for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].time <= currentTime) {
          newLine = i;
        } else {
          break;
        }
      }
      setCurrentLine(newLine)
    }
    eventBus.on('timeUpdate', handleTimeUpdate)

    return () => {
      eventBus.off('timeUpdate', handleTimeUpdate)
    }
  }, [lyrics])

  // cuộn để lời bài hát đang active ở chính giữa container
  const lyricsContainerRef = useRef(null)
  const lineRefs = useRef([])
  const disableAutoScroll = useRef(false)
  const isProgrammaticScroll = useRef(false)

  const scrollToActiveLine = () => {
    if (disableAutoScroll.current || currentLine === -1 || !lyricsContainerRef.current || !lineRefs.current[currentLine])
      return;
    
    const container = lyricsContainerRef.current;
    const activeLine = lineRefs.current[currentLine];
    const containerHeight = container.clientHeight;
    const lineHeight = activeLine.clientHeight;

    // Tính toán vị trí scroll
    const lineTop = activeLine.offsetTop;
    const scrollPosition = lineTop - lineHeight / 2 - containerHeight / 2 - 27;

    // Giới hạn scroll position để không vượt quá phạm vi
    const maxScroll = container.scrollHeight - containerHeight;
    const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

    isProgrammaticScroll.current = true

    container.scrollTo({
      top: finalScrollPosition,
      behavior: 'smooth'
    })

    const handleScrollEnd = () => {
      isProgrammaticScroll.current = false;
      container.removeEventListener('scrollend', handleScrollEnd);
    }
    container.addEventListener('scrollend', handleScrollEnd);
  };
  useEffect(() => {
    scrollToActiveLine()
  }, [currentLine])

  const enableAutoScroll = debounce(() => {
    disableAutoScroll.current = false
  }, 5000)
  const suspendAutoScroll = () => {
    if (isProgrammaticScroll.current) return
    disableAutoScroll.current = true
    enableAutoScroll()
  }
  useEffect(() => { //clean up
    return () => {
      enableAutoScroll.cancel()
    }
  },[])

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-lg font-bold mb-5">
        <DotLottieReact
          src="https://lottie.host/b84dc140-256a-4180-a86e-6cba7543e18c/jJZEe9khfg.lottie"
          loop autoplay
          className="w-200 aspect-ratio-2/1 mb-5"
        />
        <div className="-mt-5 text-xl">{error}</div>
      </div>
    );
  }
  if (!lyrics) {
    return (
      <div className="h-full flex flex-col items-center justify-start w-[97%] sm:w-[88%] md:w-[60%] mx-auto py-8">
        <Skeleton className="w-full h-15 mb-4" />
        <Skeleton className="w-full h-15 mb-4" />
        <Skeleton className="w-full h-15 mb-4" />
        <Skeleton className="w-full h-15 mb-4" />
        <Skeleton className="w-full h-15 mb-4" />
      </div>
    );
  }

  return (
    <>
      <div
        ref={lyricsContainerRef}
        onScroll={suspendAutoScroll}
        className="select-none flex flex-col gap-3 items-center justify-start pb-8 w-[97%] sm:w-[88%] md:w-[60%] lg:w-[50%] mx-auto white-space-pre-wrap h-full overflow-auto hide-scrollbar"
      >
        {lyrics.map((item, index) => (
          <div
            ref={el => lineRefs.current[index] = el}
            key={index}
            className={`text-3xl sm:text-3xl lg:text-4xl w-full font-bold hover:underline hover:text-primary cursor-pointer transition-colors duration-300
              ${index === currentLine ? 'text-primary' : 'text-primary-foreground'}`}
            onClick={() => {
              eventBus.emit('clickLyrics', [item.time])
              disableAutoScroll.current = false
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </>
  )
}

export default LyricsTabs;