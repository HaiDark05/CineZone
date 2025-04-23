import React, { useState } from 'react';

function PrivacyPolicy() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    return (
        <div>
            <div className="bg-white shadow-md p-4 ml-4">

                {/* Tiêu đề 1 */}
                <div
                    className="bg-teal-500 text-white font-bold p-3 cursor-pointer"
                    onClick={() => setIsOpen1(!isOpen1)}
                >
                    {isOpen1 ? '−' : '+'} CHÍNH SÁCH THU THẬP, SỬ DỤNG VÀ BẢO MẬT THÔNG TIN CÁ NHÂN CỦA KHÁCH HÀNG
                </div>
                {isOpen1 && (
                    <div className="p-4 text-gray-800 space-y-4 leading-relaxed">
                        <p>Kính chào quý khách hàng,</p>
                        <p>
                            Chúng tôi là <strong>CÔNG TY TNHH DỊCH VỤ GIẢI TRÍ CINEZONE</strong><br />
                            MST: 0402081337<br />
                            Địa chỉ: 404 Trần Cao Vân, Phường Xuân Hà, Quận Thanh Khê, Thành phố Đà Nẵng<br />
                            Điện thoại: 0775493859<br />
                            Email: hainguyen.08052003@gmail.com
                        </p>
                        <p>
                            CineZone luôn nỗ lực hết sức trong việc bảo vệ sự riêng tư của khách hàng và tuân thủ tất cả các nguyên tắc về đảm bảo bí mật thông tin khách hàng.
                        </p>
                    </div>
                )}

                {/* Tiêu đề 2 */}
                <div
                    className="bg-teal-500 text-white font-bold p-3 cursor-pointer mt-4"
                    onClick={() => setIsOpen2(!isOpen2)}
                >
                    {isOpen2 ? '−' : '+'} CHÍNH SÁCH VỀ THU THẬP, SỬ DỤNG VÀ BẢO MẬT THÔNG TIN CÁ NHÂN
                </div>
                {isOpen2 && (
                    <div className="p-4 text-gray-800 space-y-4 leading-relaxed">
                        <div>
                            <p className="font-semibold">1. Mục đích thu thập thông tin cá nhân</p>
                            <ul className="list-disc pl-5">
                                <li>Đăng ký tài khoản và xác thực người dùng.</li>
                                <li>Thực hiện các giao dịch đặt vé và thanh toán.</li>
                                <li>Gửi thông báo xác nhận, lịch chiếu, ưu đãi khuyến mãi.</li>
                                <li>Hỗ trợ khách hàng khi có sự cố phát sinh.</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">2. Loại thông tin được thu thập</p>
                            <ul className="list-disc pl-5">
                                <li>Họ và tên</li>
                                <li>Số điện thoại</li>
                                <li>Địa chỉ email</li>
                                <li>Ngày tháng năm sinh (tuỳ chọn)</li>
                                <li>Lịch sử đặt vé và hành vi sử dụng dịch vụ</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">3. Phạm vi sử dụng thông tin</p>
                            <p>
                                Thông tin của bạn chỉ được sử dụng cho mục đích vận hành dịch vụ, chăm sóc khách hàng và các chương trình khuyến mãi...
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">4. Thời gian lưu trữ thông tin</p>
                            <p>
                                Thông tin cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu huỷ bỏ từ phía khách hàng hoặc chúng tôi không còn mục đích sử dụng.
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">5. Cam kết bảo mật thông tin</p>
                            <ul className="list-disc pl-5">
                                <li>Mã hoá dữ liệu trong quá trình truyền tải.</li>
                                <li>Hệ thống tường lửa và kiểm soát truy cập.</li>
                                <li>Chỉ những người có thẩm quyền mới được truy cập vào dữ liệu cá nhân của bạn.</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">6. Quyền của khách hàng</p>
                            <ul className="list-disc pl-5">
                                <li>Yêu cầu xem lại thông tin cá nhân của mình.</li>
                                <li>Chỉnh sửa, xoá bỏ hoặc yêu cầu ngừng sử dụng thông tin.</li>
                                <li>Khiếu nại nếu thông tin bị lạm dụng.</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold">7. Liên hệ</p>
                            <p>
                                Mọi thắc mắc liên quan đến chính sách bảo mật, vui lòng liên hệ qua:<br />
                                Email: hainguyen.08052003@gmail.com<br />
                                Hotline: 0775493859
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PrivacyPolicy;
