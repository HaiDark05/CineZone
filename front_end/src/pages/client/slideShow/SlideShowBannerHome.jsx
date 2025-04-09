import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bannerSale1 from "../../../assets/BannerSales/sale_combo.jpg";
import bannerSale2 from "../../../assets/BannerSales/sale_price.jpg";
import bannerSale3 from "../../../assets/BannerSales/sale_ticket.jpg";
import bannerSale4 from "../../../assets/BannerSales/sale_pack.jpg";
import bannerSale5 from "../../../assets/BannerSales/saler_starligt1.png";
import bannerSale6 from "../../../assets/BannerSales/banner_sale.jpg";

function SlideShowBannerHome() {
    const bannerSale = [
        { id: 1, image: bannerSale1, title: "Combo Siêu Rẻ", description: "Tháng 3 này, đừng bỏ lỡ cơ hội “bỏ túi” Combo siêu hấp dẫn tại RIO nhé! 🤩" },
        { id: 2, image: bannerSale2, title: "Happy Day - Vé 45K", description: "🌟 Duy nhất thứ 3 hàng tuần, xem phim thả ga cùng Rio Cinemas! 🎬" },
        { id: 3, image: bannerSale3, title: "Cùng Đón Phim Hay", description: "✨ TRAO NHAU MÓN QUÀ – CÙNG ĐÓN PHIM HAY ✨🎉 Tết trao quà, nhận niềm vui! Lì xì cho hên, bánh mứt cho ngọt, nhưng muốn có một cái Tết xịn hết nấc" },
        { id: 4, image: bannerSale4, title: "Chỉ từ 45k", description: "Xem phim sớm - khuya trước 9h30 và sau 21h30 ƯU ĐÃI HẰNG NGÀY - XEM PHIM THẢ GA CÙNG RIO CINEMAS" },
        { id: 5, image: bannerSale5, title: "Thứ 5 - Thành Viên", description: "🍉 Mua vé cho suất chiếu trước 17h: Mua 01 vé TẶNG 01 ly nước 🍇 Mua vé cho suất chiếu sau 17h: Mua 01 vé + 01 bắp  TẶNG 01 ly nước" },
        { id: 6, image: bannerSale6, title: "Giả Giá Ngay", description: "✨ Giả gía sốc cho giá vé xem phim tại Galaxy Cinemas ✨" },
    ];

    return (
        <div className="w-full mx-auto p-4 rounded-lg bg-[linear-gradient(-20deg,#d558c8_0%,#24d292_100%)]">
            <h1 className='text-white text-[40px] font-semibold mb-4'>Sales</h1>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20} // Khoảng cách giữa các slide
                slidesPerView={3} // Mặc định hiển thị 3 phim trên desktop
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop
                breakpoints={{
                    320: { slidesPerView: 1 }, // Mobile: 1 phim trên 1 hàng
                    640: { slidesPerView: 3 }, // Tablet: 3 phim trên 1 hàng
                    1024: { slidesPerView: 3 }, // Desktop: 3 phim trên 1 hàng
                }}
            >
                {bannerSale.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg">
                            <img
                                className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                src={banner.image}
                                alt=""
                            />
                            {/* Overlay xuất hiện khi hover */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 px-4 text-center">
                                <h3 className="text-white text-xl font-bold">{banner?.title}</h3>
                                <p className="text-white text-sm">
                                    {banner?.description}
                                </p>
                                <button className="mt-2 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideShowBannerHome;
