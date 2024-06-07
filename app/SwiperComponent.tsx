import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from 'next/image';
import cat1 from './Cat1.jpeg'; 
import cat2 from './Cat2.png'; 
import cat3 from './Cat3.png'; 
import cat4 from './Cat4.png'; 
import cat5 from './Cat5.png'; 

export default function SwiperComponent() {
  return (
    <div className="swiper-background border border-sky-200">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="h-[50vh] sm:h-[40vh] md:h-[30vh] lg:h-[25vh] xl:h-[20vh] w-fit"
      >
        {[cat1, cat2, cat3, cat4, cat5].map((image, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center p-0 m-0"
            style={{ width: 'auto' }}
          >
            <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
              <Image
                src={image}
                alt={`Cat ${index + 1}`}
                layout="responsive"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}