import React, { useState } from 'react';

function TheaterRules(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(prev => !prev);
    };
    return (
        <div className="bg-white shadow-md p-4 ml-4">
            <div className="bg-teal-500 text-white font-bold p-3 cursor-pointer" onClick={toggleContent}>
                + NỘI QUY KHI VÀO RẠP
            </div>
            {isOpen && (
                <>
                    <div className="p-4 text-gray-800 space-y-4 leading-relaxed text-justify">
                        <p>
                            Quý khách vui lòng tuân thủ các quy định sau để đảm bảo trải nghiệm xem phim tốt nhất cho bản thân và những người xung quanh:
                        </p>

                        <ul className="list-disc pl-6">
                            <li>Không mang thức ăn, đồ uống từ bên ngoài vào rạp chiếu.</li>
                            <li>Không sử dụng điện thoại, thiết bị ghi hình, quay phim hoặc chụp ảnh trong rạp.</li>
                            <li>Không gây ồn ào, làm ảnh hưởng đến người khác trong quá trình xem phim.</li>
                            <li>Vui lòng giữ gìn vệ sinh, không xả rác bừa bãi trong rạp.</li>
                            <li>Không hút thuốc hoặc sử dụng các chất gây nghiện trong khuôn viên rạp chiếu.</li>
                            <li>Tuân thủ sự hướng dẫn của nhân viên khi có yêu cầu đặc biệt (sự cố, thay đổi lịch chiếu,...).</li>
                        </ul>

                        <p>
                            CINEZONE có quyền từ chối phục vụ hoặc yêu cầu rời khỏi rạp đối với các trường hợp vi phạm nội quy mà không cần hoàn tiền.
                        </p>

                        <p className="text-sm">
                            ⚠️ Nếu quý khách có thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ nhân viên tại quầy hoặc hotline: <strong>0775493859</strong>.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default TheaterRules;