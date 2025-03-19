import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { androidStoreApp, appleStoreApp, confirm, logos } from '../../../utils/Containts';

function FooterClient(props) {
    return (
        <div className=" bg-gradient-to-r from-black via-gray-700 to-zinc-400">
            <div className="bg-slate-800 h-[10px]"></div>
            <div className="footer-path w-[90%] m-auto p-4">
                <img className="w-[120px]" src={logos} alt="Logo" />

                <div className="list-infor grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-7 mt-4">
                    <div className="infor-company text-white text-[16px] space-y-3">
                        <span className="block">CineZone là dịch vụ được cung cấp bởi Công ty Cổ Phần CineZone Company, thành viên của Công ty Cổ Phần Giải Trí và Giáo Dục CineZone (GEE.,JSC)</span>
                        <span className="block">Địa chỉ: 404 Trần Cao Vân, Phường Xuân Hà, Thành Phố Đà Nẵng, Việt Nam.</span>
                        <span className="block">Mã số doanh nghiệp: 08053257.</span>
                        <span>Ngày cấp mã số doanh nghiệp: 08/05/2024.</span>
                        <span>Nơi cấp: Sở kế hoạch và đầu tư thành phố Đà Nẵng.</span>
                        <img className="w-[150px] mt-4" src={confirm} alt="Informed" />
                    </div>

                    <div className="review">
                        <span className="text-white font-bold">GIỚI THIỆU</span>
                        <ul className="list-none space-y-3 text-white mt-5">
                            <li>Quy chế sử dụng Dịch vụ</li>
                            <li>Chính sách bảo mật</li>
                            <li>Khuyến mãi</li>
                        </ul>
                    </div>

                    <div className="support">
                        <span className="text-white font-bold">HỖ TRỢ</span>
                        <ul className="list-none space-y-3 text-white mt-5">
                            <li>1900 8675 (24/7)</li>
                            <li>cinezone.com.vn</li>
                            <li>https://cinezone.vn/help</li>
                        </ul>
                    </div>

                    <div className="contact">
                        <div className="dowload-app">
                            <span className="text-white">TẢI ỨNG DỤNG</span>
                            <div className="img-app flex gap-2 mt-5">
                                <img className="w-[120px]" src={androidStoreApp} alt="Android App" />
                                <img className="w-[120px]" src={appleStoreApp} alt="iOS App" />
                            </div>
                        </div>
                        <div className="icon-contact mt-3">
                            <span className="text-white">KẾT NỐI VỚI CHÚNG TÔI</span>
                            <div className="icon-social flex text-white gap-5 text-[40px] mt-4">
                                <FaFacebook className='hover:text-cyan-500 transition duration-1000 ease-in'/>
                                <FaInstagram className='hover:text-red-400 transition duration-1000 ease-in'/>
                                <FaYoutube className='hover:text-red-600 transition duration-1000 ease-in'/>
                                <FaTiktok className='hover:text-violet-400 transition duration-1000 ease-in'/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterClient;