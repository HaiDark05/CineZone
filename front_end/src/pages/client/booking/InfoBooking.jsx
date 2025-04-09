import React, { useContext, useEffect } from 'react';
import { ContextCinemas } from '../../../context/CinemasProvider';
import { ContextMovies } from '../../../context/MovieProvider';
import { ContextBooking } from '../../../context/BookingContext';
import { getOjectById } from '../../../utils/FunctionConvert';
import { Link, useLocation } from 'react-router-dom';
import { ContextRooms } from '../../../context/RoomsProvider';
import { ContextTypeChairs } from '../../../context/TypeChairsProvider';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { ContextFood } from '../../../context/FoodProvider';

function InfoBooking({ screen, room, totalFood }) {
    const { cinemas } = useContext(ContextCinemas);
    const { movies } = useContext(ContextMovies);
    const { booking, setBooking } = useContext(ContextBooking);
    const { rooms } = useContext(ContextRooms);
    const { typeChairs } = useContext(ContextTypeChairs);
    const { movieScreens } = useContext(ContextMovieScreens);
   
    const { foodSV } = useContext(ContextFood);

    const location = useLocation();
    const nextPage = location.pathname === '/foodbooking' ? '/checkout' : '/foodbooking';

    const reduced = () => {
        return booking?.list_chair?.reduce((sum, item) => {
            const chairType = getOjectById(typeChairs, item.id_type_chair);
            const screen = getOjectById(movieScreens, booking?.id_screen);
            return sum + (chairType?.price || 0) * (screen?.ratio || 1);
        }, 0) || 0;
    };
    return (
        <div>
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 border-t z-20">
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 ">
                    <div className="hidden md:flex items-center gap-4">
                        {screen && (
                            <>
                                <div className="">
                                    <img src={getOjectById(movies, screen?.id_movie)?.imgUrl}
                                        alt=""
                                        className="w-24 h-auto rounded-lg" />
                                </div>

                                <ul className="list-none h-full space-y-2 self-center">
                                    <li className="text-[18px] font-semibold">Phim: <span className="font-normal">{getOjectById(movies, screen?.id_movie)?.name}</span></li>
                                    <li className="text-[18px] font-semibold">Rạp: <span className="font-normal">{getOjectById(cinemas, screen?.id_cinema)?.name}</span></li>
                                    <li className="text-[18px] font-semibold">
                                        {getOjectById(rooms, room.id)?.name}
                                    </li>
                                    <li className="text-[18px] font-semibold">Suất: <span className="font-normal">{booking?.time}</span></li>
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="flex md:justify-evenly justify-start gap-10">
                        <ul className="space-y-2 text-[18px] font-semibold">
                            <li>Ghế:
                                {booking?.list_chair?.map((e, index) => (
                                    <span className='font-normal ml-1'>{e.title}</span>
                                ))}
                            </li>

                            <li>Combo: <span className='font-normal'>
                                {booking?.bill?.map((food, index) => {
                                    const foodItem = getOjectById(foodSV, food.id_food);
                                    return (
                                        <span key={index} className="font-normal ml-1">
                                            {booking.bill.length === index + 1
                                                ? `${foodItem?.name} (${food?.quantity})`
                                                : `${foodItem?.name} (${food?.quantity}), `}
                                        </span>
                                    )
                                })}
                            </span>
                            </li>
                            <li>Tổng Tiền: <span className='font-normal'>{(reduced() + totalFood).toLocaleString('vi-VN') || 0} <sup>đ</sup></span></li>
                        </ul>
                        <ul className="hidden md:block space-y-2 font-semibold">
                            <li>Tiền vé: <span className='font-normal'>{parseInt(reduced()).toLocaleString('vi-VN')} <sup>đ</sup></span></li>
                            <li >Tiền Combo: <span className='font-normal'>{totalFood?.toLocaleString('vi-VN') || 0}</span> <sup>đ</sup></li>
                        </ul>
                    </div>
                    <div className="flex justify-end items-center">
                        <Link to={nextPage}>
                            <button className='px-6 py-3 bg-gray-500 text-white text-lg rounded-full min-w-[120px] hover:bg-gray-700 transition-all'>
                                NEXT
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoBooking;