import React, { useState } from 'react';

function PaymentPolicy(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(prev => !prev);
    };
    return (
        <div className="bg-white shadow-md p-4 ml-4">
            <div className="bg-teal-500 text-white font-bold p-3 cursor-pointer" onClick={toggleContent}>
                + CHÍNH SÁCH THANH TOÁN
            </div>
            {isOpen && (
                <>
                    <div className="p-4 text-gray-800 space-y-4 leading-relaxed text-justify">
                        <p>
                            Quý khách có thể lựa chọn các hình thức thanh toán sau khi đặt vé trên hệ thống CINEZONE:
                        </p>

                        <ul className="list-disc pl-6">
                            <li>Thanh toán qua thẻ ATM nội địa (có đăng ký Internet Banking)</li>
                            <li>Thanh toán bằng thẻ tín dụng/thẻ ghi nợ quốc tế (Visa)</li>
                            <li>Thanh toán qua ví điện tử (Momo, ZaloPay, BIDV)</li>
                        </ul>

                        <p>
                            Sau khi thanh toán thành công, hệ thống sẽ gửi xác nhận đặt vé về email và tin nhắn điện thoại của bạn. Vé điện tử có thể được dùng để vào rạp trực tiếp mà không cần in vé giấy.
                        </p>

                        <p>
                            Nếu trong vòng 10 phút sau khi thanh toán bạn không nhận được xác nhận, vui lòng liên hệ hotline: <strong>0775493859</strong> hoặc email: <strong>hainguyen.08052003@gmail.com</strong> để được hỗ trợ.
                        </p>

                        <p className="text-sm">
                            ⚠️ CINEZONE không chịu trách nhiệm với các thanh toán không hợp lệ do lỗi nhập sai thông tin hoặc lỗi từ phía ngân hàng, ví điện tử.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default PaymentPolicy;
