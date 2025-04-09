import React from 'react';

function SupportPage(props) {
    return (
        <div className="bg-gradient-to-r from-black via-gray-700 to-zinc-400">
            <div className="w-[70%] m-auto flex p-4">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-md p-4">
                <div className="bg-gray-500 text-white font-bold p-3">RẠP CHIẾU PHIM</div>
                <ul className="mt-2 space-y-2">
                    <li className="bg-gray-300 p-2 transition-all duration-300 ease-in hover:bg-gray-400 cursor-pointer">TRỰC TUYẾN</li>
                    <li className="bg-gray-300 p-2 transition-all duration-300 ease-in hover:bg-gray-400 cursor-pointer">BẢNG GIÁ VÉ</li>
                    <li className="bg-gray-300 p-2 transition-all duration-300 ease-in hover:bg-gray-400 cursor-pointer">BẢNG GIÁ BẮP NƯỚC</li>
                </ul>
            </div>

            {/* Content */}
            <div className="w-3/4 bg-white shadow-md p-4 ml-4">
                <div className="bg-teal-500 text-white font-bold p-3">+ PHÂN LOẠI ĐỘ TUỔI XEM PHIM</div>
                <div className="p-4 text-gray-800">
                    <p>
                        Căn cứ Thông tư số 12/2015/TT-BVHTTDL của Bộ Văn hóa, Thể thao và Du
                        lịch có hiệu lực thi hành từ ngày 01/01/2017, Tiêu chí phân loại phim
                        theo lứa tuổi được quy định như sau:
                    </p>
                    <ul className="mt-2 space-y-1">
                        <li><strong>P:</strong> Phim được phép phổ biến rộng rãi đến mọi đối tượng</li>
                        <li><strong>K:</strong> Phim phổ biến rộng rãi, dưới 13 tuổi cần người bảo hộ</li>
                        <li><strong>C13:</strong> Phim cấm trẻ em dưới 13 tuổi</li>
                        <li><strong>C16:</strong> Phim cấm trẻ em dưới 16 tuổi</li>
                        <li><strong>C18:</strong> Phim cấm trẻ em dưới 18 tuổi</li>
                    </ul>
                    <p className="mt-4 text-sm">
                        Khách hàng vui lòng chứng thực độ tuổi của mình phù hợp với điều kiện
                        phân loại của phim. CINEZONE có quyền từ chối bán vé cứng như vào
                        phòng chiếu và không hoàn trả lại tiền vé nếu khách hàng không tuân
                        thủ quy định.
                    </p>
                </div>
                <div className="bg-gray-200 text-gray-800 p-3 mt-4 cursor-pointer">+ LỊCH CHIẾU PHIM TẠI CINEZONE</div>
            </div>
        </div>
        </div>
    );
}

export default SupportPage;