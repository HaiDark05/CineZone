import React, { useState } from 'react';

function MemberPolicy() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div>
            <div className="bg-white shadow-md p-4 ml-4">
                <div
                    className="bg-teal-500 text-white font-bold p-3 cursor-pointer"
                    onClick={toggleContent}
                >
                    {isOpen ? '−' : '+'} QUYỀN LỢI CỦA KHÁCH HÀNG THÀNH VIÊN
                </div>
                {isOpen && (
                    <div className="p-4 text-gray-800 space-y-4 leading-relaxed text-justify">
                        <p>
                            Sau khi hoàn thành giao dịch thanh toán, điểm thưởng sẽ được ghi nhận vào tài khoản thành viên chậm nhất vào lúc <strong>8:00 sáng ngày tiếp theo</strong>.
                        </p>
                        <p>
                            Điểm thưởng có <strong>thời hạn sử dụng đến ngày 31/12 hàng năm</strong> và sẽ tự động trở về <strong>0 điểm</strong> kể từ ngày 1/1 của năm kế tiếp.
                        </p>
                        <p>
                            Điểm thưởng tích lũy có giá trị như tiền mặt và được sử dụng để:
                        </p>
                        <ul className="list-disc pl-6">
                            <li>Mua vé xem phim</li>
                            <li>Sử dụng các dịch vụ ăn uống tại hệ thống CINEZONE</li>
                        </ul>
                        <p>
                            Lưu ý: <strong>Điểm thưởng tối thiểu được sử dụng cho mỗi giao dịch là 40 điểm</strong>.
                        </p>
                        <p className="text-sm">
                            🎁 <strong>Quà tặng sinh nhật:</strong> Khách hàng thuộc hạng <strong>CINEZONE MEMBER</strong> trở lên, trong tháng sinh nhật sẽ được tặng <strong>01 combo</strong> gồm:
                        </p>
                        <ul className="list-disc pl-6 text-sm">
                            <li>1 vé xem phim</li>
                            <li>1 bắp</li>
                            <li>1 nước ngọt</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemberPolicy;
