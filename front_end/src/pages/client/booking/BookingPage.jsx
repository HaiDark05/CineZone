import React, { useContext, useEffect, useState } from 'react';
import screen_pic from "../../../assets/screen.png"
import { ContextBooking } from '../../../context/BookingContext';
import { ContextRooms } from '../../../context/RoomsProvider';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { getOjectById } from '../../../utils/FunctionConvert';
import BookingSeat from './BookingSeat';
import InfoBooking from './InfoBooking';
function BookingPage(props) {
    const { booking, setBooking } = useContext(ContextBooking);
    const { movieScreens } = useContext(ContextMovieScreens);
    const { rooms } = useContext(ContextRooms);
    const [screen, setScreen] = useState("")
    const [room, setRoom] = useState({});
    useEffect(() => {
        const screen3 = getOjectById(movieScreens, booking.id_screen);
        setScreen(screen3);
        const newRoom = getOjectById(rooms, screen3?.id_room[0]);
        setRoom(newRoom);
        setBooking({...booking, id_room : screen3?.id_room[0] });
    }, [rooms,movieScreens]);

    return (
        <div className='m-auto w-[70%] my-2'>
            <h1 className='text-violet-500 text-2xl text-center font-semibold'>MÀN HÌNH</h1>
            <div>
                <img className='w-[600px] m-auto' src={screen_pic} alt="" />
            </div>
            <BookingSeat row={room} screen={screen} setRoom={setRoom} />
            <InfoBooking screen={screen} room={room} setScreen={setScreen}/>
        </div>

    );
}

export default BookingPage;