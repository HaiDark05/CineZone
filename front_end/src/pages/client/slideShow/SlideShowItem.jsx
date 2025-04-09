import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaRegBookmark } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { FaTicket } from 'react-icons/fa6';
import { ContextMovies } from '../../../context/MovieProvider';
function SlideShowItem(props) {
  const icons = [FaTicket, FaRegBookmark, CiHeart, IoIosInformationCircleOutline];
  const { movies } = useContext(ContextMovies);
  return (
    <div className="">
      <h1 className="text-white text-[30px] font-semibold mb-4">Top Phim Hot Trong Tháng</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Khoảng cách giữa các slide
        slidesPerView={5} // Mặc định hiển thị 5 phim
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        breakpoints={{
          320: { slidesPerView: 2 }, // Mobile: 2 phim
          640: { slidesPerView: 3 }, // Tablet: 3 phim
          1024: { slidesPerView: 5 }, // Desktop: 5 phim
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-100 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={movie.imgUrl}
                alt={movie.name}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <div className="flex gap-3">
                  {icons.map((Icon, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <Icon />
                    </div>
                  ))}
                </div>
                <span className="text-white text-lg font-semibold text-center">
                  {movie.name}
                </span>
                <div className="text-white text-sm flex gap-2 line-clamp-3">
                  <li>{movie.duration} phút</li>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideShowItem;