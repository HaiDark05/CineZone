import React, { useContext, useEffect, useState } from 'react';
import { ContextFood } from '../../../context/FoodProvider';
import { filterListById, getOjectById } from '../../../utils/FunctionConvert';
import { ContextRooms } from '../../../context/RoomsProvider';
import { ContextBooking } from '../../../context/BookingContext';
import InfoBooking from './InfoBooking';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';

function BookingFood() {
    const { foodSV } = useContext(ContextFood);
    const { rooms } = useContext(ContextRooms);
    const [room, setRoom] = useState({});
    const [food, setFood] = useState([]);
    const { booking, setBooking } = useContext(ContextBooking);
    const { movieScreens } = useContext(ContextMovieScreens);
    const [totalFood,setTotalFood] = useState(0);
    const [screen, setScreen] = useState("");

    useEffect(() => {
        const screen3 = getOjectById(movieScreens, booking.id_screen);
        setScreen(screen3);
        const newRoom = getOjectById(rooms, booking.id_room);
        setRoom(newRoom);
        const foodByCinema = filterListById(foodSV, screen3.id_cinema, "id_cinema");
        setFood(foodByCinema);
    }, [rooms, movieScreens]);

    const addFood = (id) => {
        setBooking(prev => {
            const existingItem = prev.bill.find(f => f.id_food === id);

            let updatedBill;
            if (existingItem) {
                // Nếu món đã có trong bill, tăng quantity
                updatedBill = prev.bill.map(f =>
                    f.id_food === id ? { ...f, quantity: f.quantity + 1 } : f
                );
            } else {
                // Nếu món chưa có, thêm mới vào bill
                updatedBill = [...prev.bill, { id_food: id, quantity: 1 }];
            }

            return { ...prev, bill: updatedBill };
        });
       
    };
    const removeFood = (id) => {
        setBooking(prev => {
            const existingItem = prev.bill.find(f => f.id_food === id);

            if (!existingItem) return prev; // Nếu món không tồn tại, giữ nguyên state

            let updatedBill;
            if (existingItem.quantity > 1) {
                // Nếu số lượng > 1, giảm đi 1
                updatedBill = prev.bill.map(f =>
                    f.id_food === id ? { ...f, quantity: f.quantity - 1 } : f
                );
            } else {
                // Nếu số lượng = 1, xóa món khỏi bill
                updatedBill = prev.bill.filter(f => f.id_food !== id);
            }

            return { ...prev, bill: updatedBill };
        });
    };

    useEffect(() => {
        if (!booking?.bill) return;
      
        const sum = booking.bill.reduce((total, item) => {
          const food = getOjectById(foodSV, item.id_food);
          if (!food) return total;
      
          const price = parseInt(food.price) || 0;
          const discount = parseInt(food.discount) || 0;
          const finalPrice = (price - (price * discount / 100))*item.quantity;
      
          return total + finalPrice;
        }, 0);
        setTotalFood(sum);
      }, [booking]);
      
    return (
        <>
            <div className='bg-gradient-to-r from-black via-gray-700 to-zinc-400 lg:w-[80vw] m-auto' >
                <div className="p-4 bg-white">
                    <h2 className="text-center text-xl font-semibold mb-4">Bước 2: Chọn Combo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {food.map((food) => (
                            <div key={food.id} className="flex items-center border rounded-lg p-4 shadow-md">
                                <img src={food?.imgUrl} alt="" className="w-20 h-20 mr-4" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{food?.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-red-500 mt-2">{(parseInt(food?.price) - parseInt(food?.price)*parseInt(food?.discount)/100).toLocaleString()} <sup>đ</sup></p>
                                        <p className='font-semibold text-black mt-2 line-through'> {food?.price.toLocaleString()} <sup>đ</sup></p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => removeFood(food.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xl"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 text-lg">
                                        {
                                            booking.bill.find(f => f.id_food === food.id) ? booking.bill.find(f => f.id_food === food.id).quantity : 0
                                        }
                                    </span>
                                    <button onClick={() => addFood(food.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <InfoBooking screen={screen} room={room}  totalFood={totalFood} />
        </>

    );
}

export default BookingFood;