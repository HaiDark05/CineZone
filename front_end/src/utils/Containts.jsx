import { FaMapLocationDot } from "react-icons/fa6";
import { BiSolidMoviePlay } from "react-icons/bi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdRoomService } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import logo from "../assets/logo.png";
import chai from "../assets/Chairs/chairnormal.png";
import chairChoose from "../assets/Chairs/chairs.png"
import informed from "../assets/informed.png"
import appleStore from "../assets/applestore.png"
import androidStore from "../assets/androidstore.png"


export const logos = logo ;
export const chairSelect = chairChoose;
export const confirm = informed;
export const appleStoreApp = appleStore;
export const androidStoreApp = androidStore;
export const chairDefault = chai;
export const cloud_name = "dutvlfn32";
export const upload = "movie_booking";
export const apiKey = '158845455227221';  // Replace with your actual API key
export const apiSecret = 'dUA5j32tOmFPiKBW0scQWA_zK0o';  // Replace with your actual API secret
export const menus = [
    {
        id: 1,
        title: "Media Management",
        icon: <BiSolidMoviePlay />,
        items: [
            {
                id: 1,
                title: "Movie",
                path: "media_management/Movie"
            },
            {
                id: 2,
                title: "MovieScreening",
                path: "media_management/MovieScreening"
            }
        ]
    },
    {
        id: 2,
        title: "Cast and crew",
        icon: <TiGroup />,
        items: [
            {
                id: 1,
                title: "Actors",
                path: "cast_and_crew/Actor"
            },
            {
                id: 2,
                title: "Characters",
                path: "cast_and_crew/Characters"
            },
            {
                id: 3,
                title: "Authors",
                path: "cast_and_crew/Authors"
            }
        ]
    },
    {
        id: 3,
        title: "Region",
        icon: <FaMapLocationDot />,
        items: [
            {
                id: 1,
                title: "Regions ",
                path: "region/Regions"
            },
            {
                id: 2,
                title: "Locations ",
                path: "region/Locations"
            },
            {
                id: 3,
                title: "Cinema ",
                path: "region/Cinema  "
            }
        ]
    },
    {
        id: 4,
        title: "Seating",
        icon: <MdAirlineSeatReclineExtra />,
        items: [
            {
                id: 1,
                title: "Room",
                path: "seating/Room"
            },
            {
                id: 2,
                title: "Chairs",
                path: "seating/Chairs"
            },
            {
                id: 3,
                title: "TypeChairs",
                path: "seating/TypeChairs"
            }
        ]
    },
    {
        id: 5,
        title: "Service",
        icon: <MdRoomService />,
        items: [
            {
                id: 1,
                title: "Tickets",
                path: "service/Tickets"
            },
            {
                id: 2,
                title: "OrderDetails",
                path: "service/OrderDetails"
            },
            {
                id: 3,
                title: "Food",
                path: "service/Food"
            }
        ]
    }

];

export const menu_client = [
    {
        id: 1,
        title : "Homepage",
        path:"/"
    },
    {
        id: 2,
        title : "Movie",
        path:"/movies"
    },
    {
        id: 3,
        title : "MovieScreening",
        path:"/moviescreening"
    },
    {
        id: 4,
        title : "Cinema",
        path:"/cinemas"
    },
    {
        id: 5,
        title : "Support",
        path:"/supports"
    },
    {
        id: 6,
        title : "Contact",
        path:"/contacts"
    }
];