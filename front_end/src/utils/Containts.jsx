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
import avatarImg from "../assets/avatar/avatar_default.avif"

export const logos = logo;
export const chairSelect = chairChoose;
export const confirm = informed;
export const appleStoreApp = appleStore;
export const androidStoreApp = androidStore;
export const chairDefault = chai;
export const avatarDefault = avatarImg;
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
                title: "OrderDetails",
                path: "service/OrderDetails"
            },
            {
                id: 2,
                title: "Food",
                path: "service/Food"
            }
        ]
    }

];

export const menu_client = [
    {
        id: 1,
        title: "Home",
        path: "/"
    },
    {
        id: 2,
        title: "MovieScreening",
        path: "/moviescreeningregion"
    },
    {
        id: 3,
        title: "Support",
        path: "/supports"
    },
    {
        id: 4,
        title: "Contact",
        path: "/contacts"
    },
    {
        id: 5,
        title: "Member",
        path: "/members"
    }
];

export const menuMember = [
    {
        id: 1,
        title: "MemberPolicy",
        path: "/members/memberpolicy"
    },
    {
        id: 2,
        title: "PrivacyPolicy",
        path: "/members/privacypolicy"
    },
    {
        id: 3,
        title: "PaymentPolicy",
        path: "/members/paymentpolicy"
    },
    {
        id: 4,
        title: "TheaterRules",
        path: "/members/threaterrules"
    }
];



export const ChairA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export const SECRET_KEY = "0775493859";
export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    USER: 'user',          // Người dùng thông thường
};

export const initialOptions = {
    "client-id": "AVC0OJzKvJYZHscCpkfaWJGTIe6FclH6Avpyc86pMjx12Iy9ykrQalJ4FORGU5F-89x0gbBCxuUP9sSM",
    currency: "USD",
    intent: "capture"
};

export const COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#A28FFB', // Lavender
    '#F765A3', // Pink
    '#FF6B6B', // Coral
    '#4CAF50', // Green
    '#FFD700', // Gold
    '#8A2BE2', // BlueViolet
    '#FF4500', // OrangeRed
    '#20B2AA'  // LightSeaGreen
];

export const YOUR_SERVICE_ID = "service_e05j4bd";
export const YOUR_USER_ID = "Ofc0P_QZEwCOOxMGq";
export const CONFIRM_CODE = "template_vxbtwic";