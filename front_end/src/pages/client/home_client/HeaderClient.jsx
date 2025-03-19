import React, { useEffect, useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft, FaSearch } from "react-icons/fa";
import { logos, menu_client } from '../../../utils/Containts';

function HeaderClient(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="p-4 bg-gradient-to-r from-black via-gray-700 to-zinc-400 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
            <div onClick={toggleMenu} className="lg:hidden">
                {menuOpen ? <FaArrowCircleLeft className='text-white text-[30px] cursor-pointer' /> : <HiOutlineMenu className='text-white text-[30px] cursor-pointer' />}
            </div>
            <img className='w-[80px] h-[40px]' src={logos} alt="" />
            <ul className={`${menuOpen ? "flex bg-gradient-to-r from-black via-gray-700 to-zinc-400" : "hidden"} lg:flex list-none whitespace-nowrap flex-col lg:flex-row gap-4 text-white text-[18px] lg:bg-transparent fixed lg:static top-16 left-0 right-0 p-4 lg:p-0 transition-all duration-500`}
            >
                {
                    menu_client.map((e, i) => (
                        <Link className='hover:text-orange-200 transition duration-1000 ease-in' key={i} to={e.path}>{e.title}</Link>
                    ))
                }
                <div className="item-search flex">
                    <div className="bg-slate-400 p-2 w-[30px] flex justify-center items-center transition duration-700 ease-in hover:bg-lime-500 hover:text-zinc-500 rounded-tl-lg rounded-bl-lg">
                        <FaSearch className='font-bold' />
                    </div>
                    <input type="text" placeholder="Search by Name" className='border-2 border-slate-600 rounded-tr-lg rounded-br-lg px-2 w-full md:w-[15vw]' />
                </div>
            </ul>
            <div className="text-white whitespace-nowrap px-4 py-2 border-2 border-white rounded-full bg-transparent hover:bg-white hover:text-black transition duration-1000 ease-in">
                Đăng nhập
            </div>
        </div>
    );
}

export default HeaderClient;