import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import Image from 'next/image'
import diner1 from "./diner1.jpg"
import diner2 from "./diner2.jpg"
import diner3 from "./diner3.jpg"

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
        className="h-[45vh] sm:h-[40vh] md:h-[40vh] lg:h-[40vh] xl:h-[30vh] w-fit"
      >
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner1}
              alt="Diner 1"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner2}
              alt="Diner 2"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner3}
              alt="Diner 3"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner1}
              alt="Diner 1"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner2}
              alt="Diner 2"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner3}
              alt="Diner 3"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner1}
              alt="Diner 1"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner2}
              alt="Diner 2"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center p-0 m-0" style={{ width: 'auto' }}>
          <div className="relative flex items-center justify-center w-full h-full p-0 m-0">
            <Image
              src={diner3}
              alt="Diner 3"
              style={{
                width: '100%',
                height: '100%'
              }}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
