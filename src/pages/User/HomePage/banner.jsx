import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth.context';
import { Link } from 'react-router-dom';

function Banner() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <section className="mb-10 grid grid-cols-1">
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={1000}
          loop={true}
          modules={[Autoplay]}
          className='block w-full'
        >
          <SwiperSlide className='w-full flex items-center justify-center'>
            <img
              src={"/banner-1.jpg"}
              alt="Banner"
              className='aspect-[38/14] sm:aspect-[38/8] object-cover self-center'
            />
          </SwiperSlide>
          <SwiperSlide className='w-full flex items-center justify-center'>
            <img
              src={"/banner-2.jpg"}
              alt="Banner"
              className='aspect-[38/14] sm:aspect-[38/8] object-cover'
            />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className='mb-5 grid grid-cols-1'>
        <Swiper
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={500}
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            425: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            }
          }}
          className='block w-full'
        >
          {user && user.userInfo.country && (
            <SwiperSlide>
              <div className="p-1.5 sm:p-3 cursor-pointer bg-muted rounded-md flex items-center gap-3 bg-gradient bg-gradient-1">
                <div className='size-22 sm:size-30 xl:size-33 rounded-full overflow-hidden border border-border flex flex-col items-center justify-center'>
                  <strong className="text-base sm:text-lg xl:text-xl text-red-800 dark:text-red-300">TOP HITS</strong>
                  <p className="text-xs sm:text-sm xl:text-base text-muted-foreground">Music Chart</p>
                </div>
                <div className='space-y-2'>
                  <h4 className='line-clamp-2'>Top music of <strong className='bg-linear-to-r from-[var(--green-highlight)] to-[var(--logo-color)] text-transparent bg-clip-text'>{user.userInfo.country}</strong></h4>
                  <p className='text-sm sm:text-base text-muted-foreground line-clamp-2'>Music Chart this week</p>
                </div>
              </div>
            </SwiperSlide>
          )}

          <SwiperSlide>
            <Link className="p-1.5 sm:p-3 cursor-pointer bg-muted rounded-md flex items-center gap-3 bg-gradient bg-gradient-2"
              to="/top-playlist/us-uk-hits"
            >
              <div className='size-22 sm:size-30 xl:size-33 rounded-sm overflow-hidden border border-border flex flex-col items-center justify-center'>
                <img
                  src="/us-uk.webp"
                  alt='US-UK'
                  className='w-full aspect-square object-cover'
                />
              </div>
              <div className='space-y-2'>
                <h4 className='line-clamp-2'>Today&apos;s <strong className='bg-linear-to-r from-[#f12711] to-[#f5af19] text-transparent bg-clip-text'>US-UK</strong> Hits</h4>
                <p className='text-sm sm:text-base text-muted-foreground line-clamp-2'>Music Chart this week</p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-1.5 sm:p-3 cursor-pointer bg-muted rounded-md flex items-center gap-3 bg-gradient bg-gradient-3">
              <div className='size-22 sm:size-30 xl:size-33 rounded-sm overflow-hidden border border-border flex flex-col items-center justify-center'>
                <img
                  src="/k-pop.webp"
                  alt='K-POP'
                  className='w-full aspect-square object-cover'
                />
              </div>
              <div className='space-y-2'>
                <h4 className='line-clamp-2'><strong className='bg-linear-to-r from-[#4e54c8] to-[#8f94fb] text-transparent bg-clip-text'>K-POP</strong> Perfect All-Kill</h4>
                <p className='text-sm sm:text-base text-muted-foreground line-clamp-2'>Music Chart this week</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-1.5 sm:p-3 cursor-pointer bg-muted rounded-md flex items-center gap-3 bg-gradient bg-gradient-4">
              <div className='size-22 sm:size-30 xl:size-33 rounded-sm overflow-hidden border border-border flex flex-col items-center justify-center'>
                <img
                  src="/v-pop.webp"
                  alt='V-POP'
                  className='w-full aspect-square object-cover'
                />
              </div>
              <div className='space-y-2'>
                <h4 className='line-clamp-2'>Today&apos;s <strong className='bg-linear-to-r from-[#DCE35B] to-[#45B649] text-transparent bg-clip-text'>V-POP</strong> Hits</h4>
                <p className='text-sm sm:text-base text-muted-foreground line-clamp-2'>Music Chart this week</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-1.5 sm:p-3 cursor-pointer bg-muted rounded-md flex items-center gap-3 bg-gradient bg-gradient-5">
              <div className='size-22 sm:size-30 xl:size-33 rounded-sm overflow-hidden border border-border flex flex-col items-center justify-center'>
                <img
                  src="/us-uk-2.webp"
                  alt='US-UK'
                  className='w-full aspect-square object-cover'
                />
              </div>
              <div className='space-y-2'>
                <h4 className='line-clamp-2'>New release from <strong className='bg-linear-to-r from-[#c471ed] to-[#f64f59] text-transparent bg-clip-text'>US-UK</strong></h4>
                <p className='text-sm sm:text-base text-muted-foreground line-clamp-2'>Music Chart this week</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-1.5 sm:p-3 cursor-pointer bg-muted rounded-md flex items-center gap-3 bg-gradient bg-gradient-3">
              <div className='size-22 sm:size-30 xl:size-33 rounded-sm overflow-hidden border border-border flex flex-col items-center justify-center'>
                <img
                  src="/k-pop-2.webp"
                  alt='K-POP'
                  className='w-full aspect-square object-cover'
                />
              </div>
              <div className='space-y-2'>
                <h4 className='line-clamp-2'><strong className='bg-linear-to-r from-[#4e54c8] to-[#8f94fb] text-transparent bg-clip-text'>K-POP</strong> DeaBak</h4>
                <p className='text-sm sm:text-base text-muted-foreground line-clamp-2'>Music Chart this week</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  )
}

export default Banner