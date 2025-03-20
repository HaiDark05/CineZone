import React from 'react';
import banner1 from "../../../assets/BannerMovieBooking/bogia.png"
import banner2 from "../../../assets/BannerMovieBooking/flow.jpg"
import boGia from "../../../assets/imgFilm/BoGia.jpg";
import flow from "../../../assets/imgFilm/flow.jpg";
import nuHonBacTy from "../../../assets/imgFilm/nu_hon_bac_ty.jpg";
import emma from "../../../assets/imgFilm/emma.jpg";
import bannersale from "../../../assets/BannerSales/banner_sale.jpg";
import satThuVoCungCuc from "../../../assets/imgFilm/sat_thu_vo_cung_cuc.jpg";
import attackOnTitan from "../../../assets/imgFilm/attackontitan.jpg";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import { FaTicket } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { FaRegBookmark } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";

function HomePage(props) {
  const movielist = [
    { id: 1, src: boGia, name: "Bố Già", genre: "Comedy", duration: "110 phút", rating: "T13" },
    { id: 2, src: flow, name: "Flow", genre: "Aniation", duration: "101 phút", rating: "T12" },
    { id: 3, src: nuHonBacTy, name: "Nụ Hôn Bạc Tỷ", genre: "Comedy", duration: "110 phút", rating: "T18" },
    { id: 4, src: emma, name: "Emma", genre: "Animation", duration: "110 phút", rating: "T13" },
    { id: 5, src: satThuVoCungCuc, name: "Sát Thủ Vô Cùng Cực", genre: "Action", duration: "112 phút", rating: "T18" },
    { id: 6, src: attackOnTitan, name: "Attack on Titan", genre: "Animation", duration: "118 phút", rating: "T16" },
    { id: 7, src: boGia, name: "Bố Già", genre: "Comedy", duration: "110 phút", rating: "T13" },
    { id: 8, src: flow, name: "Flow", genre: "Aniation", duration: "101 phút", rating: "T12" },
    { id: 9, src: nuHonBacTy, name: "Nụ Hôn Bạc Tỷ", genre: "Comedy", duration: "110 phút", rating: "T18" },
    { id: 10, src: emma, name: "Emma", genre: "Animation", duration: "110 phút", rating: "T13" }
  ];
  const icons = [FaTicket, FaRegBookmark, CiHeart, IoIosInformationCircleOutline];
  return (
    <div className="py-4 bg-gradient-to-r from-black via-gray-700 to-zinc-400 text-center">
      <div className="relative">
        <IoIosArrowBack className="text-gray-500 hover:text-white absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-[50px]" />
        <div className="w-[100%] mx-auto relative">
          <img className="w-full object-cover h-[700px]" src={banner1} alt="" />
          <div className="absolute top-1/2 left-[100px] transform -translate-y-1/2 max-md:top-auto max-md:bottom-0 max-md:left-1/2 max-md:-translate-x-1/2 max-md:transform">
            <div className="text flex flex-col items-center justify-center mt-3">
              <button className=" text-center text-black px-20 py-3 border-2 bg-white rounded-full bg-transparent hover:bg-slate-300 transition duration-1000 ease-in mb-4 text-[22px] font-bold max-md:px-10 max-md:py-2 max-md:text-[14px]">Đăng ký ngay</button>
              <span className="block text-white text-[18px] font-bold max-md:text-[16px] text-center whitespace-nowrap">Bạn muốn đặt vé ngay bây giờ ? Đăng ký tài khoản tại <a href="#" className="text-blue-400">đây</a></span>
            </div>
          </div>
        </div>
        <IoIosArrowForward className="text-gray-500 hover:text-white absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-[50px]" />
      </div>
      <div className="px-4 flex justify-center gap-5 my-4">
        <Select
          color="warning"
          placeholder="Choose region"
          variant="soft"
        >
          <Option>Đà nẵng</Option>
          <Option>Hồ Chí Minh</Option>
          <Option>Hà Nội</Option>
          <Option>Cần Thơ</Option>
        </Select>
        <Select
          color="warning"
          placeholder="Choose Location"
          variant="soft"
        >
          <Option>Quận Liên Chiểu</Option>
          <Option>Quận Thanh Khê</Option>
          <Option>Quận Hải Châu</Option>
        </Select>
        <Select
          color="warning"
          placeholder="Choose cinema"
          variant="soft"
        >
          <Option>Rio</Option>
          <Option>Galaxy</Option>
          <Option>Beta Cinemas</Option>
        </Select>
        <Select
          color="warning"
          placeholder="Choose moviescreening"
          variant="soft"
        >
          <Option>Chọn suất chiếu</Option>
        </Select>
      </div>
      <div className="bg-slate-800 h-[10px]"></div>
      <div className="mt-5 flex justify-center gap-5">
        <button className='p-2 bg-yellow-500 text-white rounded-lg font-semibold transition-all duration-500 ease-linear hover:bg-orange-600'>Phim Đang Chiếu</button>
        <button className='p-2 bg-yellow-500 text-white rounded-lg font-semibold transition-all duration-500 ease-linear hover:bg-orange-600'>Phim Sắp Chiếu</button>
      </div>
      <div className="px-4 my-5 grid md:grid-cols-5 grid-cols-2 gap-5">
        {movielist.map((movie, index) => (
          <div key={index} className="box group relative overflow-hidden">
            <img className="rounded-md w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" src={movie.src} alt={movie.name} />
            <div className="detail-movie flex flex-col items-center justify-center gap-2 p-3 opacity-0 transition-opacity duration-300 delay-200 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-50">
              <div className="flex gap-3">
                {icons.map((Icon, index) => (
                  <div key={index} className="p-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                    <Icon />
                  </div>
                ))}
              </div>
              <span className="text-white text-[16px] font-semibold text-center">
                {movie.name}
              </span>
              <div className="title-movie text-white text-[0.8vw] flex gap-2 justify-center">
                <span>{movie.genre}</span>
                <li>{movie.duration}</li>
                <li>{movie.rating}</li>
              </div>
            </div>
          </div>
        ))}
      </div>
      <span className='text-white text-[40px] font-semibold'>Sales</span>
      <div className="mx-auto mt-5 ">
        <div className="relative">
          <IoIosArrowBack className="text-gray-500 hover:text-white absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-[50px]" />
          <img className="w-full object-cover h-[250px]" src={bannersale} alt="" />
          <IoIosArrowForward className="text-gray-500 hover:text-white absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-[50px]" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;