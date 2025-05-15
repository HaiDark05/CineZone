import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import news1 from "../../../assets/imgNews/newsNewYear.jpg";
import news2 from "../../../assets/imgNews/newsSlide1.jpg";
import news3 from "../../../assets/imgNews/newsSlide2.jpg";
import news4 from "../../../assets/imgNews/resetCard.jpg";
import news5 from "../../../assets/imgNews/venom.jpg";

function SlideShowNews(props) {
    const bannerNews = [
            { id: 1, image: news1, title: "TẾT KHAI XUÂN – RỘN RÀNG MỞ BÁN VÉ PHIM TẾT TẠI CINEZONE!", description: "Chào năm mới với loạt siêu phẩm điện ảnh cực đỉnh tại CINEZONE! Từ mùng 1 Tết, rạp đã sẵn sàng để mang đến những khoảnh khắc ngập tràn niềm vui và  ..." },
            { id: 2, image: news2, title: "Kiều Minh Tuấn tăng 15 kg để đóng 'Cô dâu hào môn'", description: 'Diễn viên Kiều Minh Tuấn cho biết tăng 15 kg trong hơn một tháng để đóng vai người cha nghèo trong "Cô dâu hào môn".' },
            { id: 3, image: news3, title: "Robot Hoang Dã: Kiệt tác hoạt hình hay nhất 2024", description: "Tựa phim hoạt hình mới của nhà DreamWorks thừa sức trở thành ứng cử viên sáng giá nhất cho giải Oscar năm sau." },
            { id: 4, image: news4, title: "THÔNG BÁO TIẾN HÀNH RESET ĐIỂM THEO THÔNG LỆ NĂM 2024", description: "CINEZONE xin thông báo sẽ tiến hành tự động reset thẻ thành viên vào ngày 31/12/2024" },
            { id: 5, image: news5, title: "‘Venom: Kèo cuối’: Lần cuối Eddie và Venom sát cánh trên màn ảnh rộng?", description: "Liệu 'Venom: Kèo cuối' có phải màn chia ly đầy cảm xúc giữa Eddie và Venom sau nhiều năm bên nhau hay cả hai sẽ tử chiến tới giây phút cuối cùng?" },
        ];
    return (
        <div className="w-full mx-auto p-4 rounded-lg bg-[linear-gradient(to_top,#dbdcd7_0%,#dddcd7_24%,#e2c9cc_30%,#e7627d_46%,#b8235a_59%,#801357_71%,#3d1635_84%,#1c1a27_100%)]">
            <h1 className='text-white text-[40px] font-semibold mb-4'>News</h1>
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
                {bannerNews.map((news) => (
                    <SwiperSlide key={news.id}>
                        <div className="group relative overflow-hidden rounded-lg shadow-lg">
                            <img
                                className="w-full h-[250px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                src={news?.image}
                                alt=""
                            />
                            {/* Overlay xuất hiện khi hover */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 px-4 text-center">
                                <h3 className="text-white text-xl font-bold">{news.title}</h3>
                                <p className="text-white text-sm">
                                    {news.description}
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

export default SlideShowNews;