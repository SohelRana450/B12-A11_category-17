import React from 'react';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

import { Autoplay,Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// ⭐ MUST HAVE — Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../assets/bus.jpeg';
import img2 from '../assets/design-50.webp';
import img3 from '../assets/BIF.jpg';
import img4 from '../assets/plane.jpg';

const Banner = () => {
  return (
   <div className="relative text-[#ffffff]  items-center justify-center mb-30">

  
  <div className="absolute inset-0">
    <Swiper
      modules={[Autoplay,Pagination,]}
      autoplay={true}
      loop
      pagination={true}
      slidesPerView={1}
      className="h-90  md:h-130 rounded-xl "
    >
      <SwiperSlide>
        <img src={img1} className="w-full h-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} className="w-full h-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} className="w-full  h-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img4} className="w-full h-full" />
      </SwiperSlide>
    </Swiper>

   
  </div>

  {/* 🟡 TEXT OVERLAY */}
  <div className="relative z-10  top-42 md:top-80  px-3 ">
    <h1 className="text-4xl lg:text-6xl font-bold  leading-tight">
      Tickets for Every Journey —{" "}
      <span className="text-yellow-400">
        <Typewriter
          words={["Bus", "Train", "Launch", "& Flight"]}
          loop
          cursor
          cursorStyle="."
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </span>
    </h1>

    <p className="text-lg max-w-xl font-medium">
      All travel tickets in one platform — book Bus, Train, Launch & Flight
      tickets instantly. Fast, secure, and hassle-free.
    </p>
      <Link to="/auth/register" className="btn btn-active bg-[#508ec0]  rounded-xl border-0 text-white">
       Sign In / Register
      </Link>
   
  </div>
</div>

  );
};

export default Banner;
