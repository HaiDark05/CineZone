import React, { useContext, useEffect, useState } from 'react';
import { ContextCinemas } from '../../../context/CinemasProvider';
import { filterListById, getOjectById } from '../../../utils/FunctionConvert';
import { ContextLocations } from '../../../context/LocationProvider';
import { ContextRegions } from '../../../context/RegionsProvider';
import SlideShowBannerHome from '../slideShow/SlideShowBannerHome';
import { Link, useParams } from 'react-router-dom';

function MovieScreenCinema(props) {
    const { id } = useParams();
    const { cinemas } = useContext(ContextCinemas)
    const { locations } = useContext(ContextLocations);
    const { regions } = useContext(ContextRegions);
    const [cinemaShow, setCinemaShow] = useState([]);
    useEffect(() => {
        const cine = filterListById(cinemas, id, "id_region");
        setCinemaShow(cine);
        window.scrollTo(0, 0);
    }, [id, cinemas]);
    return (
        <div className='bg-gradient-to-r from-black via-gray-700 to-zinc-400'>
            <div className="m-auto p-8 w-[80%] grid md:grid-cols-2 gap-6">
            {cinemaShow.length > 0 ? (
                    cinemaShow.map((cinema, index) => {
                        const locationName = getOjectById(locations, cinema.id_location)?.name;
                        const regionName = getOjectById(regions, cinema.id_region)?.name;

                        const hasInfo = cinema.name && cinema.address && cinema.imgUrl;

                        return (
                            <div key={index} className="border rounded-lg overflow-hidden shadow-lg bg-gray-700 text-white p-4">
                                {hasInfo && (
                                    <Link to={`/moviescreening/${cinema.id}`}>
                                        <img src={cinema.imgUrl} alt="" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105 hover:opacity-90" />
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold">{cinema.name}</h2>
                                            <p className="text-sm mt-1">
                                                📍 {cinema.address} - {locationName} - {regionName}
                                            </p>
                                            <button className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500">
                                                XEM CHI TIẾT
                                            </button>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-white text-center col-span-full">
                        😢 Hiện tại khu vực này chưa có rạp nào.
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieScreenCinema;