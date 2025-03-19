import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/client/page_home/HomePage';
import MoviePage from '../pages/client/movie/MoviePage';
import MovieScreeningPage from '../pages/client/movie_screening/MovieScreeningPage';
import CinemaPage from '../pages/client/cinema/CinemaPage';
import SupportPage from '../pages/client/supports/SupportPage';
import Contact from '../pages/client/contact/Contact';

function ClientRouters(props) {
    const router = [
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/movies",
            element: <MoviePage />,
        },
        {
            path: "/moviescreening",
            element: <MovieScreeningPage />,
        },
        {
            path: "/cinemas",
            element: <CinemaPage />,
        },
        {
            path: "/supports",
            element: <SupportPage />,
        },
        {
            path: "/contacts",
            element: <Contact />,
        }
    ]
    return (
        <Routes>
            {router.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))
            }
        </Routes>
    );
}

export default ClientRouters;