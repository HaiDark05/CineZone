import React, { useContext } from 'react';
import { IoTimeSharp } from "react-icons/io5";
import { ContextBooking } from '../../../context/BookingContext';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { getOjectById } from '../../../utils/FunctionConvert';
import { ContextMovies } from '../../../context/MovieProvider';
import { Link } from 'react-router-dom';

function CheckoutPage(props) {
    const { booking, setBooking } = useContext(ContextBooking);
    const { movieScreens } = useContext(ContextMovieScreens);
    const { movies } = useContext(ContextMovies);
    console.log(booking);
    return (
        <div>
            <div className="w-[70%] mx-auto p-4">
                <h2 className="text-center text-xl font-semibold mb-4">
                    Bước 3: Hình Thức Thanh Toán
                </h2>

                {/* Time countdown */}
                <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-2 text-red-600 text-2xl">
                        <IoTimeSharp /> 04 : 53
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left info section */}
                    <div className="md:col-span-2 space-y-4">
                        {getOjectById(movieScreens, booking.id_screen) && (
                            <div className="flex gap-4">
                                <img
                                    src={getOjectById(movies, getOjectById(movieScreens, booking.id_screen)?.id_movie)?.imgUrl}
                                    alt=""
                                    className="w-28 h-40 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {getOjectById(movies, getOjectById(movieScreens, booking.id_screen)?.id_movie)?.name}
                                    </h3>
                                    <p>RIO Liên Chiểu Đà Nẵng - Phòng 03</p>
                                    <p>Suất chiếu 06/04/2025 - 09:40</p>
                                </div>
                            </div>
                        )}
                        {/* User Info */}
                        <div>
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-semibold">
                                THÔNG TIN NGƯỜI MUA
                            </h4>
                            <div className="p-4 border">
                                <p>
                                    <strong>Họ tên:</strong> HaiLy
                                </p>
                                <p>
                                    <strong>Email:</strong> hainguyen.08052003@gmail.com
                                </p>
                                <p>
                                    <strong>SĐT:</strong> 0905497210
                                </p>
                            </div>
                        </div>

                        {/* Ticket Info */}
                        <div>
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-semibold">
                                THÔNG TIN VÉ
                            </h4>
                            <div className="p-4 border space-y-2">
                                <div className="flex gap-2">
                                    <span className="border px-4 py-1 text-red-500 font-bold border-red-500 rounded">
                                        B08
                                    </span>
                                    <span className="border px-4 py-1 text-red-500 font-bold border-red-500 rounded">
                                        B09
                                    </span>
                                </div>
                                <p>
                                    <strong>Số lượng:</strong> 2
                                </p>
                                <p>
                                    <strong>Tổng:</strong> 130.000 Đ
                                </p>
                            </div>
                        </div>

                        {/* Combo Info */}
                        <div>
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-semibold">
                                THÔNG TIN BẮP NƯỚC
                            </h4>
                            <div className="p-4 border space-y-2">
                                <h1>COMBO 1 BẮP CARAMEL + 1 NƯỚC: 1</h1>
                                <p>
                                    <strong>Số lượng:</strong> 2
                                </p>
                                <p>
                                    <strong>Tổng:</strong> 130.000 Đ
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Payment Section */}
                    <div>
                        <h4 className="bg-gray-700 text-white px-4 py-2 font-semibold">
                            THÔNG TIN THANH TOÁN
                        </h4>
                        <div className="border p-4 space-y-4">
                            <div className="flex justify-between">
                                <span>COMBO</span>
                                <span>75.000 Đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>VÉ</span>
                                <span>130.000 Đ</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold">
                                <span>TỔNG</span>
                                <span>205.000 Đ</span>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" />
                                    Momo
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" />
                                    ZaloPay
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" />
                                    BIDV
                                </label>
                            </div>
                            <div className="mt-2">
                                <Link to={'/bookingcompleted'}>
                                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
                                        Thanh Toán
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;