import { Grid, Paper, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ContextTypeChairs } from '../../../context/TypeChairsProvider';
import { getOjectById } from '../../../utils/FunctionConvert';
import seatSelect from '../../../assets/seat-selected.png'
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { ContextRooms } from '../../../context/RoomsProvider';
import { ContextBooking } from '../../../context/BookingContext';
import { ChairA, chairDefault } from '../../../utils/Containts';
import { ContextBookings } from '../../../context/BookingsProvider';
import { useNotification } from '../../../context/NotificationContext';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

function BookingSeat({ row, screen, setRoom }) {
    const [grid, setGrid] = useState([]);
    const { typeChairs } = useContext(ContextTypeChairs);
    const { rooms } = useContext(ContextRooms);
    const { booking, setBooking } = useContext(ContextBooking);
    const { bookings } = useContext(ContextBookings);
    const showNotification = useNotification();
    useEffect(() => {
        generateGrid();
    }, [row]);

    const generateGrid = () => {
        const rows = parseInt(row?.rows);
        const cols = parseInt(row?.cols);
        setGrid(Array.from({ length: rows }, () => Array(cols).fill("")));
    };

    const showImgChair = (rowd, col) => {
        const result = row.list_chair.find(e => e.row == rowd & e.col == col);

        return result?.id_type_chair ? getOjectById(typeChairs, result?.id_type_chair)?.imgUrl : false;
    }

    const showImgChairChoose = (rowd, col) => {

        if(checkBooking(rowd, col)) {
             return chairDefault;
        }else {       
            const result = row.list_chair.find(e => e.row == rowd & e.col == col);
            const resultboking = booking.list_chair.find(e => e.row == rowd & e.col == col);
            return result?.id_type_chair && resultboking ? seatSelect : getOjectById(typeChairs, result?.id_type_chair)?.imgUrl;
        }

    }
    const getRoom = (id) => {
        const newRoom = getOjectById(rooms, id);
        setBooking({ ...booking, list_chair: [], id_room: id });
        setRoom(newRoom);
    }

    const bookingChair = (rowIndex, colIndex) => {
        if(checkBooking(rowIndex, colIndex)) {
            showNotification('Ghe da duoc dat!', "error");
            return 
       }

        if (!showImgChair(rowIndex, colIndex)) {
            return;
        }
        setBooking(pre => {
            let updatedList;
            const result = row.list_chair.find(e => e.row == rowIndex & e.col == colIndex);
            result.title = nameChair(rowIndex, colIndex);
            updatedList = toggleSelection(pre.list_chair, result);
            return { ...booking, list_chair: updatedList };
        })
    }
    const toggleSelection = (list, item) => {
        const resultboking = booking.list_chair.find(e => e.row == item.row & e.col == item.col);
        return resultboking ? list.filter(i => i !== item) : [...list, item];
    };

    const nameChair = (rowIndex, colIndex) => {
        return ChairA[rowIndex] + colIndex;
    }
  console.log(bookings);
  
    const checkBooking = (row,col) => {
        
        const check = bookings.some(e => 
             booking.id_room == e.id_room &&
             booking.id_screen == e.id_screen &&
             booking.time == e.time &&
            e.list_chair.some(c => c.row == row && c.col == col)
        );
      return check ;
    }
    return (
        row && <div className="grid md:grid-cols-[1fr_3fr_1fr] grid-cols-1 gap-4">
            <div className="col-span-1">
                {typeChairs?.map((e, index) => (
                    <div key={index} className="flex items-center gap-3 font-semibold text-[16px]">
                        <div className="">
                            <img className='w-5 h-5' src={e?.imgUrl} alt="" />
                        </div>
                        <h1>{e?.name}</h1>
                    </div>
                ))}
                <div className="flex items-center gap-2 font-semibold text-[16px]">
                    <div className="">
                        <img className='w-5 h-5' src={seatSelect} alt="" />
                    </div>
                    <h1>Ghế Đang Chọn</h1>
                </div>
            </div>
            <div className="col-span-1 flex justify-center">
                <Grid item xs={3}>
                    <Item sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${row.cols}, 1fr)`,
                                gap: '3px',
                                width: "100%"
                            }}
                        >
                            {row.cols &&
                                grid.flat().map((element, index) => {
                                    const rowIndex = Math.floor(index / row.cols);
                                    const colIndex = index % row.cols;
                                    const key = `${rowIndex}-${colIndex}`;

                                    return (
                                        <div onClick={() => bookingChair(rowIndex, colIndex)} key={key} className="relative">
                                            <img
                                                className={`w-10 h-10 cursor-pointer ${showImgChair(rowIndex, colIndex) ? "" : "opacity-0"}`}
                                                src={showImgChairChoose(rowIndex, colIndex)}
                                                alt={`Chair ${key}`}
                                            />
                                            <p className={`font-semibold absolute translate-x-1/2 translate-y-1/2 top-0 left-0 z-10 ${showImgChair(rowIndex, colIndex) ? "" : "opacity-0"}`}>{nameChair(rowIndex, colIndex)}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    </Item>
                </Grid>
            </div>
            <div className="col-span-1 flex justify-center items-center space-x-2 font-semibold">
                {
                    screen?.id_room?.sort((a, b) => {
                        const roomA = getOjectById(rooms, a);
                        const roomB = getOjectById(rooms, b);
                        return roomA?.name?.localeCompare(roomB?.name); // Sắp xếp theo tên
                    }).map((element, i) => (
                        <button onClick={() => getRoom(element)}
                            className={`p-2 rounded-lg transition-all duration-300 ease-in hover:bg-yellow-500 ${element == row?.id ? "bg-red-400" : " bg-yellow-200"}`}>{getOjectById(rooms, element)?.name}</button>
                    ))
                }
            </div>
        </div>

    );
}

export default BookingSeat;