import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import BookingComplete from '../pages/client/booking/BookingComplete';
import MovieBookingRecords from '../pages/client/movie_booking_record/MovieBookingRecords';
import MemberPolicy from '../pages/client/member/MemberPolicy';
import PrivacyPolicy from '../pages/client/member/PrivacyPolicy';
import PaymentPolicy from '../pages/client/member/PaymentPolicy';
import TheaterRules from '../pages/client/member/TheaterRules';

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
            path: "/bookingcompleted",
            element: <BookingComplete />
        },
        {
            path: '/members',
            element: <Members />,
            children: [
                {
                    path: "", // mặc định khi vào /members
                    element: <Navigate to="memberpolicy" replace />
                },
                {
                    path: 'memberpolicy',
                    element: <MemberPolicy />
                },
                {
                    path: 'privacypolicy',
                    element: <PrivacyPolicy />
                },
                {
                    path: 'paymentpolicy',
                    element: <PaymentPolicy />
                },
                {
                    path: 'threaterrules',
                    element: <TheaterRules />
                }
            ]
        }
    ]
    return (
        // <Routes>
        //     {router.map((route, index) => (
        //         <Route key={index} path={route.path} element={route.element} />
        //     ))
        //     }
        // </Routes>
        <Routes>
            {router.map((route, index) => {
                if (route.children) {
                    return (
                        <Route key={index} path={route.path} element={route.element}>
                            {route.children.map((child, i) => (
                                <Route key={i} path={child.path} element={child.element} />
                            ))}
                        </Route>
                    );
                }
                return <Route key={index} path={route.path} element={route.element} />;
            })}
        </Routes>
    );
}

export default ClientRouters;