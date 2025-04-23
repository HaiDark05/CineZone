import React from 'react';
import Categories from '../pages/admin/categories/Categories';
import DashBoard from '../pages/admin/dashboard/DashBoard';
import { Route, Routes } from 'react-router-dom';
import Movie from '../pages/admin/media_management/movie/Movie';
import MovieScreening from '../pages/admin/media_management/movie_screening/MovieScreening';
import Actors from '../pages/admin/cast_and_crew/actors/Actors';
import Characters from '../pages/admin/cast_and_crew/characters/Characters';
import Authors from '../pages/admin/cast_and_crew/authors/Authors';
import Locations from '../pages/admin/region/locations/Locations';
import Cinema from '../pages/admin/region/cinema/Cinema';
import Rooms from '../pages/admin/seating/rooms/Rooms';
import TypeChairs from '../pages/admin/seating/type_chairs/TypeChairs';
import OrderDetails from '../pages/admin/service/order_details/OrderDetails';
import Food from '../pages/admin/service/food/Food';
import Regions from '../pages/admin/region/regions/Regions';
import ManagerUser from '../pages/admin/manager_user/ManagerUser';
import ProfileAdmin from '../pages/admin/profile_admin/ProfileAdmin';



function AdminRouters(props) {
    const router = [
        {
            path: "/",
            element: <DashBoard />
        },
        {
            path: "/categories",
            element: <Categories />,
        },

        {
            path: "media_management/Movie",
            element: <Movie />,
        },
        {
            path: "media_management/MovieScreening",
            element: <MovieScreening />,
        },
        {
            path: "cast_and_crew/Actor",
            element: <Actors />,
        },
        {
            path: "cast_and_crew/Characters",
            element: <Characters />,
        },
        {
            path: "cast_and_crew/Authors",
            element: <Authors />,
        },
        {
            path: "region/Regions",
            element: <Regions />,
        },
        {
            path: "region/Locations",
            element: <Locations />,
        },
        {
            path: "region/Cinema",
            element: <Cinema />,
        },
        {
            path: "seating/Room",
            element: <Rooms />,
        },
        {
            path: "seating/TypeChairs",
            element: <TypeChairs />,
        },
        {
            path: "service/OrderDetails",
            element: <OrderDetails />,
        },
        {
            path: "service/Food",
            element: <Food />,
        },
        {
            path: "/customeraccount",
            element: <ManagerUser/>,
        },
        {
            path: "/profileadmin",
            element: <ProfileAdmin/>,
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

export default AdminRouters;