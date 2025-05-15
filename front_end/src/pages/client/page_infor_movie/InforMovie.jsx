import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegPlayCircle } from "react-icons/fa";

import { ContextMovies } from '../../../context/MovieProvider';
import { ContextCategories } from '../../../context/CategoryProvider';
import { ContextActors } from '../../../context/ActorsProvider';
import { ContextAuthors } from '../../../context/AuthorsProvider';
import { ContextCharacters } from '../../../context/CharacterProvider';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getOjectById } from '../../../utils/FunctionConvert';

function InforMovie() {
    const { id } = useParams();
    const [showTrailer, setShowTrailer] = useState(false);
    const handleOpen = () => setShowTrailer(true);
    const handleClose = () => setShowTrailer(false)
    const { movies } = useContext(ContextMovies);
    const { categories } = useContext(ContextCategories);
    const { authors } = useContext(ContextAuthors);
    const { actors } = useContext(ContextActors);
    const { characters } = useContext(ContextCharacters);

    const movie = getOjectById(movies, id);
    const author = getOjectById(authors, movie?.id_author);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isAnimation = movie?.listCate?.some(cateId => {
        const cate = getOjectById(categories, cateId);
        return cate?.name === "Animation";
    });

    const nameList = isAnimation
        ? movie?.listCharacter?.map(id => getOjectById(characters, id)?.name).join(", ")
        : movie?.listActor?.map(id => getOjectById(actors, id)?.name).join(", ");

    return (
        <>
            <div className="p-6 text-white bg-gradient-to-r from-black via-gray-700 to-zinc-400">
                <div className="max-w-5xl mx-auto p-4 rounded-2xl shadow-2xl bg-gradient-to-r from-black via-gray-800 to-zinc-700">
                    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-start">
                        <div className="relative w-fit">
                            <img
                                src={movie?.imgUrl}
                                alt={movie?.name}
                                className="w-64 h-96 object-cover rounded-xl shadow-md"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button onClick={handleOpen}>
                                    <FaRegPlayCircle className="text-white text-6xl opacity-80 hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold text-orange-400">{movie?.name}</h1>

                            <p className="text-lg">
                                <span className="text-orange-300 font-semibold">Đạo diễn: </span>
                                <span className="text-white">{author?.name}</span>
                            </p>

                            <p className="text-lg">
                                <span className="text-orange-300 font-semibold">
                                    {isAnimation ? "Nhân vật: " : "Diễn viên: "}
                                </span>
                                <span className="text-white">{nameList}</span>
                            </p>

                            <p className="text-base text-gray-200 text-justify leading-relaxed">
                                {movie?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-3xl aspect-video p-4">
                        <button
                            className="absolute top-0 right-0 "
                            onClick={handleClose}
                        >
                            <IoIosCloseCircleOutline className='text-white text-4xl'/>
                        </button>
                        <iframe
                            src={movie.urlTrailer?.replace("watch?v=", "embed/")}
                            className="w-full h-full rounded-lg"
                            allowFullScreen
                            title="Trailer"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default InforMovie;
