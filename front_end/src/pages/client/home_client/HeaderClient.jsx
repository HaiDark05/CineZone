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
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="p-4 bg-gradient-to-r from-black via-gray-700 to-zinc-400 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
            <div onClick={toggleMenu} className="md:hidden">
                {menuOpen ? <FaArrowCircleLeft className="text-white text-[30px] cursor-pointer" /> : <HiOutlineMenu className="text-white text-[30px] cursor-pointer" />}
            </div>
            <img className="w-[80px] h-[40px]" src={logos} alt="Logo" />
            <ul className={`fixed md:static top-16 left-0 right-0 p-4 md:p-0 flex flex-col md:flex-row gap-4 text-white text-[18px] transition-all duration-500 
        ${menuOpen ? "flex bg-gradient-to-r from-black via-gray-700 to-zinc-400" : "hidden"} md:flex md:bg-transparent`}>
                {menuOpen && (
                    <div className="flex items-center bg-gradient-to-r from-black via-gray-700 to-zinc-400 p-4 md:hidden">
                        <div className="bg-gray-300 px-4 flex justify-center items-center transition duration-300 ease-in-out hover:bg-lime-500 hover:text-white rounded-l-lg h-8">
                            <FaSearch className="text-gray-700 text-lg" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Name"
                            className="border border-gray-400 focus:border-lime-500 focus:outline-none px-3 h-8 text-gray-700 rounded-r-lg w-full transition duration-300"
                        />
                    </div>
                )}
                {menu_client.map((e, i) => (
                    <Link className="hover:text-orange-200 transition duration-1000 ease-in" key={i} to={e.path}>{e.title}</Link>
                ))}
            </ul>

            <div className="hidden md:flex items-center w-[20vw]">
                <div className="bg-gray-300 px-4 flex justify-center items-center transition duration-300 ease-in-out hover:bg-lime-500 hover:text-white rounded-l-lg h-8">
                    <FaSearch className="text-gray-700 text-lg" />
                </div>
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="border border-gray-400 focus:border-lime-500 focus:outline-none px-3 h-8 text-gray-700 rounded-r-lg w-full transition duration-300"
                />
            </div>

            <div className="flex gap-2">
                <div className="text-white cursor-pointer whitespace-nowrap px-4 py-2 border-2 border-white rounded-full bg-transparent hover:bg-white hover:text-black transition duration-1000 ease-in">
                    Login
                </div>
                <div className="text-white cursor-pointer whitespace-nowrap px-4 py-2 border-2 border-white rounded-full bg-transparent hover:bg-white hover:text-black transition duration-1000 ease-in">
                    Sign Up
                </div>
            </div>
        </div>

    );
}

export default HeaderClient;