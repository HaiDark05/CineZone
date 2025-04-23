import React, { useContext, useEffect } from 'react';
import { ContextRegions } from '../../../context/RegionsProvider';
import { Link } from 'react-router-dom';

function MovieScreenRegion(props) {
    const { regions } = useContext(ContextRegions);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className='bg-gradient-to-r from-black via-gray-700 to-zinc-400'>
            <div className="m-auto p-8 w-[80%] grid md:grid-cols-2 gap-6">
                {regions?.map((region, index) => (
                    <Link to={`/moviescreeningcinema/${region.id}`} key={index} className="border rounded-lg overflow-hidden shadow-lg">
                        <img src={region.imgUrl} alt="" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105 hover:opacity-90" />
                        <div className="bg-gray-800 text-white p-4">
                            <h2 className="text-xl font-bold">{region.name}</h2>
                            <p className="text-sm mt-1">📍 {region.description}</p>
                            <button className="mt-3 bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-500">
                                XEM CHI TIẾT
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MovieScreenRegion;