import React from 'react'
import './Slider.css'


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';






export default function Slider({children}) {
    return (

        <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}

            modules={[FreeMode, Pagination]}
            className="mySwiper mt-5"
        >
            <SwiperSlide>
               {children}
            </SwiperSlide>
            <SwiperSlide>
            {children}
              
            </SwiperSlide>
            <SwiperSlide>
            {children}
            
            </SwiperSlide>
            <SwiperSlide>
            {children}
                

            </SwiperSlide>
            <SwiperSlide>
            {children}
                

            </SwiperSlide>

        </Swiper>
    )
}



