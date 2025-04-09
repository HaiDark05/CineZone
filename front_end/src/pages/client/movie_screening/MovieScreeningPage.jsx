import React, { useContext, useEffect, useState } from 'react';
import { ContextLocations } from '../../../context/LocationProvider';
import { ContextRegions } from '../../../context/RegionsProvider';
import { ContextCinemas } from '../../../context/CinemasProvider';
import { filterListById, getOjectById, getWeekRange, formatFirebaseDate } from '../../../utils/FunctionConvert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContextMovieScreens } from '../../../context/MovieScreenProvider';
import { ContextMovies } from '../../../context/MovieProvider';
import { ContextAuthors } from '../../../context/AuthorsProvider';
import { ContextActors } from '../../../context/ActorsProvider';
import { ContextCharacters } from '../../../context/CharacterProvider';
import { ContextCategories } from '../../../context/CategoryProvider';
import { ContextBooking } from '../../../context/BookingContext';
import { useNotification } from '../../../context/NotificationContext';

function MovieScreeningPage(props) {
     const showNotification = useNotification();
    const navigate = useNavigate();
    const { booking, setBooking } = useContext(ContextBooking);
    const { id } = useParams();
    const { locations } = useContext(ContextLocations);
    const { categories } = useContext(ContextCategories);
    const { movies } = useContext(ContextMovies);
    const { regions } = useContext(ContextRegions);
    const { cinemas } = useContext(ContextCinemas);
    const { movieScreens } = useContext(ContextMovieScreens);
    const { authors } = useContext(ContextAuthors);
    const { actors } = useContext(ContextActors);
    const { characters } = useContext(ContextCharacters);
    const [screeningShow, setScreeningShow] = useState([]);
    const [date, setDate] = useState(new Date().toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }));

    useEffect(() => {
        const screening = filterListById(movieScreens, id, "id_cinema");
        setScreeningShow(screening);
        window.scrollTo(0, 0);
    }, [id, movieScreens])

    const filterScreenByDate = () => {
        return screeningShow?.filter(e => formatFirebaseDate(e.release_date) == date);
    }

    const bookingTicket = (id) => {

          if(id !== booking.id_screen) {
            showNotification('vui long chon gio chieu', "error");
            return;
          }
         navigate("/booking");
    }
    return (
        <div className='bg-gradient-to-r from-black via-gray-700 to-zinc-400 text-center'>

            <div className="p-4 border-2 border-white w-[80%] m-auto text-zinc-100">
                {getOjectById(cinemas, id) && (
                    <div>
                        <h1 className="text-[40px] font-semibold">
                            {getOjectById(cinemas, id)?.name}
                        </h1>
                        <h1 className="mt-2">
                            Địa chỉ: {getOjectById(cinemas, id)?.address} - {getOjectById(locations, getOjectById(cinemas, id)?.id_location)?.name} - Thành Phố {getOjectById(regions, getOjectById(locations, getOjectById(cinemas, id)?.id_location)?.id_region)?.name}
                        </h1>
                    </div>
                )}
            </div>
            <div className="mt-4 w-[70%] m-auto grid lg:grid-cols-7 md:grid-cols-3 grid-cols-2 gap-2">
                {getWeekRange().map((e, i) => {
                    const isToday = date == e.date;
                    return (
                        <div key={i} onClick={() => setDate(e.date)} className={`px-5 py-4 border-2 rounded-lg transition-all duration-500 ease-linear 
                            ${isToday ? 'bg-blue-500 text-white border-blue-500' : 'border-white text-zinc-100 hover:bg-white hover:text-slate-500'}`}>
                            <h1 className='font-semibold'>{e.weekday}</h1>
                            <h1>{e.date}</h1>
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 w-[70%] m-auto grid gap-6">
                {filterScreenByDate().map((screen, index) => {
                    const movie = getOjectById(movies, screen.id_movie);
                    return (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-4 p-4 rounded-lg shadow-lg"
                        >
                            <div className="flex justify-center md:justify-start">
                                <img src={movie?.imgUrl} alt="" className="w-full md:w-60 h-auto rounded-lg" />
                            </div>                       
                            <div className="flex flex-col items-start gap-2">
                                <h1 className="text-white font-semibold text-[24px] text-center md:text-left">{movie?.name}</h1>
                                <h1 className="text-orange-400">
                                    Đạo diễn: <span className="text-white">{getOjectById(authors, movie?.id_author)?.name}</span>
                                </h1>
                                <h1 className="text-orange-400">
                                    {movie?.listCate
                                        ?.map((cateId) => getOjectById(categories, cateId)?.name)
                                        .includes("Animation")
                                        ? "Nhân vật: "
                                        : "Diễn viên: "}
                                    <span className="text-white">
                                        {movie?.listCate
                                            ?.map((cateId) => getOjectById(categories, cateId)?.name)
                                            .includes("Animation")
                                            ? movie?.listCharacter?.map((e) => getOjectById(characters, e)?.name).join(", ")
                                            : movie?.listActor?.map((e) => getOjectById(actors, e)?.name).join(", ")
                                        }
                                    </span>
                                </h1>
                                <h1 className="text-white text-center md:text-left">
                                    {movie?.description}
                                </h1>
                                <hr className="border-t-2 border-yellow-400 w-full my-2" />                     
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                    {screen?.showtime?.map((time, index) => (
                                        <div onClick={() => setBooking({ ...booking, time: time, id_screen: screen.id })} key={index} className={`px-3 py-1 rounded-sm text-center cursor-pointer transition-all duration-300 ease-in 
                                            ${booking.time == time ? 'bg-red-500' : 'bg-orange-400 hover:bg-orange-500'}`}>
                                            <h1 className="text-white text-sm font-medium">{time}</h1>
                                        </div>
                                    ))}
                                </div>                                                  
                                    <button onClick={() => bookingTicket(screen.id)}
                                        type="submit"
                                        className="px-4 py-2 bg-green-400 text-white font-semibold text-[20px] rounded-lg transition-all duration-500 ease-linear hover:bg-green-800 self-center md:self-start"
                                    >
                                        Đặt vé
                                    </button>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
}

export default MovieScreeningPage;