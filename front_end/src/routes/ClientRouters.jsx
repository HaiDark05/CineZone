import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/client/page_home/HomePage';
import SupportPage from '../pages/client/supports/SupportPage';
import Contact from '../pages/client/contact/Contact';
import BookingPage from '../pages/client/booking/BookingPage';
import MovieScreenRegion from '../pages/client/movie_screening/MovieScreenRegion';
import MovieScreenCinema from '../pages/client/movie_screening/MovieScreenCinema';
import MovieScreeningPage from '../pages/client/movie_screening/MovieScreeningPage';
import Members from '../pages/client/member/Members';
import BookingFood from '../pages/client/booking/BookingFood';
import CheckoutPage from '../pages/client/booking/CheckoutPage';
import ScanQRPage from '../pages/client/booking/ScanQRPage';
import BookingComplete from '../pages/client/booking/BookingComplete';
import MovieBookingRecords from '../pages/client/movie_booking_record/MovieBookingRecords';

function ClientRouters(props) {
    const router = [
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/booking",
            element: <BookingPage />,
        },
        {
            path: "/moviescreeningregion",
            element: <MovieScreenRegion />,
        },
        {
            path: "/foodbooking",
            element: <BookingFood />,
        },
        {
            path: "/supports",
            element: <SupportPage />,
        },
        {
            path: "/contacts",
            element: <Contact />,
        },
        {
            path: "/members",
            element: <Members />,
        },
        {
            path: "/moviebookingrecord",
            element: <MovieBookingRecords />,
        },
        {
            path: "/moviescreeningcinema/:id",
            element: <MovieScreenCinema />
        },
        {
            path: "/moviescreening/:id",
            element: <MovieScreeningPage />
        },
        {
            path: "/checkout",
            element: <CheckoutPage />
        },
        {
            path: "/qrscan",
            element: <ScanQRPage/>
        },
        {
            path: "/bookingcompleted",
            element: <BookingComplete/>
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