/* eslint-disable @next/next/no-img-element */


import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { SiNike } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import { SiPuma } from "react-icons/si";
import { SiNewbalance } from "react-icons/si";
import { SiZara } from "react-icons/si";

const Brand = () => {
  return (
    <div className='flex justify-center '>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
       <SwiperSlide>
          <SiNike className=' text-9xl w-40 h-96 mx-auto text-red-600'/>
        </SwiperSlide>
       <SwiperSlide>
          <CgAdidas className=' text-9xl w-40 h-96 mx-auto text-red-600'/>
        </SwiperSlide>
       <SwiperSlide>
          <SiPuma className=' text-9xl w-40 h-96 mx-auto text-red-600'/>
        </SwiperSlide>
       <SwiperSlide>
          <SiNewbalance className=' text-9xl w-40 h-96 mx-auto text-red-600'/>
        </SwiperSlide>
       <SwiperSlide>
          <SiZara className=' text-9xl w-40 h-96 mx-auto text-red-600'/>
        </SwiperSlide>
  
      </Swiper>
    </div>
  )
}

export default Brand
