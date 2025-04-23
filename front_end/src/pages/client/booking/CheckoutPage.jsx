import React, { useContext } from 'react';
import { IoTimeSharp } from "react-icons/io5";
import { ContextBooking } from '../../../context/BookingContext';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { getOjectById } from '../../../utils/FunctionConvert';
import { ContextMovies } from '../../../context/MovieProvider';
import { ContextRooms } from '../../../context/RoomsProvider';
import { ContextCinemas } from '../../../context/CinemasProvider';
import { ContextLocations } from '../../../context/LocationProvider'
import { ContextRegions } from '../../../context/RegionsProvider';
import { ContextFood } from '../../../context/FoodProvider';
import { initialOptions } from '../../../utils/Containts';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ContextTypeChairs } from '../../../context/TypeChairsProvider';
import axios from 'axios';
import { ContextBookings } from '../../../context/BookingsProvider';
import { ContextAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../context/NotificationContext';


function CheckoutPage() {
    const showNotification = useNotification();
    const { isLogin } = useContext(ContextAuth);
    const { booking, setBooking, inner } = useContext(ContextBooking);
    const { setUpdate } = useContext(ContextBookings);
    const navigate = useNavigate();
    const { movieScreens } = useContext(ContextMovieScreens);
    const { movies } = useContext(ContextMovies);
    const { rooms } = useContext(ContextRooms);
    const { cinemas } = useContext(ContextCinemas);
    const { locations } = useContext(ContextLocations);
    const { regions } = useContext(ContextRegions);
    const { foodSV } = useContext(ContextFood);
    const { typeChairs } = useContext(ContextTypeChairs);

    const reduced = () => {
        return booking?.list_chair?.reduce((sum, item) => {
            const chairType = getOjectById(typeChairs, item.id_type_chair);
            const screen = getOjectById(movieScreens, booking?.id_screen);
            return sum + (chairType?.price || 0) * (screen?.ratio || 1);
        }, 0) || 0;
    };

    const createSubscription = async (id) => {
        const updateBookings = {...booking, id_account : isLogin.id, totalChair: booking.total - booking.totalFood, booking_date: new Date()};
        await axios.post("http://localhost:8080/api/bookings", updateBookings);
        setUpdate((prev) => !prev);
        navigate('/moviebookingrecord');
        setBooking(inner);
    }; 

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
                                    <p>{getOjectById(cinemas, getOjectById(movieScreens, booking.id_screen)?.id_cinema)?.name} - {getOjectById(locations, getOjectById(movieScreens, booking.id_screen)?.id_location)?.name} - TP.{getOjectById(regions, getOjectById(movieScreens, booking.id_screen)?.id_region)?.name} - {getOjectById(rooms, booking.id_room)?.name}</p>
                                    <p>Suất chiếu {getOjectById(movieScreens, booking.id_screen)?.release_date} - {booking?.time}</p>
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
                                    <strong>Họ tên:</strong> {isLogin?.user_name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {isLogin?.email}
                                </p>
                                <p>
                                    <strong>SĐT:</strong> {isLogin?.phone || ""}
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
                                    {booking?.list_chair?.map((e, index) => (
                                        <span key={index} className="border px-4 py-1 text-red-500 font-bold border-red-500 rounded">
                                            {e.title}
                                        </span>
                                    ))}
                                </div>
                                <p>
                                    <strong>Số lượng:</strong> {booking?.list_chair?.length || 0}
                                </p>
                                <p>
                                <strong>Tổng:</strong> <span>{parseInt(reduced()).toLocaleString('vi-VN')} <sup>đ</sup></span>
                                </p>
                            </div>
                        </div>

                        {/* Combo Info */}
                        <div>
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-semibold">
                                THÔNG TIN BẮP NƯỚC
                            </h4>
                            <div className="p-4 border space-y-2">
                                <div className="">
                                    {booking?.bill?.map((food, index) => {
                                        const foodItem = getOjectById(foodSV, food.id_food);
                                        return (
                                            <div key={index}>
                                                <span key={index} className="mr-2">
                                                    {foodItem?.name}
                                                </span>
                                                <p>
                                                    <strong>Số lượng:</strong> {food?.quantity}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <p>
                                    <strong>Tổng:</strong><span> {booking?.totalFood?.toLocaleString('vi-VN') || 0} <sup>đ</sup></span>
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
                                <span>{parseInt(reduced()).toLocaleString('vi-VN')} VNĐ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>VÉ</span>
                                <span>{booking?.totalFood?.toLocaleString('vi-VN') || 0} VNĐ</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold">
                                <span>TỔNG</span>
                                <span>{booking?.total?.toLocaleString('vi-VN') || 0} VNĐ</span>
                            </div>

                            <div className="mt-2">
                                <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons
                                        style={{ layout: "vertical" }}
                                        createOrder={(data, actions) => {
                                            const priceInUSD = (booking.total / 25000).toFixed(2);                            
                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                        value: priceInUSD,
                                                        currency_code: "USD"
                                                    }
                                                }]
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                const transactionId = details.id;
                                                createSubscription(transactionId);
                                            });
                                        }}
                                        onCancel={() => {
                                            showNotification('You have canceled the payment. Your order has not been processed', "error");
                                          }}
                                        onError={(err) => {
                                            console.error("PayPal error:", err);
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
