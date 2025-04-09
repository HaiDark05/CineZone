import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import banner1 from "../../../assets/BannerMovieBooking/bogia.png"
import banner2 from "../../../assets/BannerMovieBooking/flow.jpg"
import banner3 from "../../../assets/BannerMovieBooking/nuhonbacty.jpg"

const SlideShowHome = () => {
    const slides = [
        { id: 1, image: banner1, title: "Top Movies" },
        { id: 2, image: banner2, title: "Best Cinema Experience" },
        { id: 3, image: banner3, title: "Enjoy Your Movies" },
    ];

    return (
        <div className="w-full md:h-[600px] h-[400px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                effect="fade"
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
                            <div className="text flex flex-col items-center justify-center mt-3">
                                <h1>{slide.title}</h1>
                                <button className="mt-4 text-center text-black px-20 py-3 border-2 bg-white rounded-full bg-transparent hover:bg-slate-300 transition duration-1000 ease-in mb-4 text-[22px] font-bold max-md:px-10 max-md:py-2 max-md:text-[14px]">Đặt vé ngay</button>
                                <span className="block text-white text-[18px] font-bold max-md:text-[16px] text-center whitespace-nowrap">Bạn muốn đặt vé ngay bây giờ ? Đăng ký tài khoản tại <a href="#" className="text-blue-400">đây</a></span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SlideShowHome;
