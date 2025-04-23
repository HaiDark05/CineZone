import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import { avatarDefault, logos, menu_client } from '../../../utils/Containts';
import { IoIosArrowDown } from "react-icons/io";
import { ContextAuth } from '../../../context/AuthProvider';
import { IoMdSettings } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

function HeaderClient({ handleOpen }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { isLogin, logout } = useContext(ContextAuth);
    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
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
        <div>
            <div className="p-4 bg-gradient-to-r from-black via-gray-700 to-zinc-400 flex justify-between items-center">
                <div onClick={toggleMenu} className="md:hidden">
                    {menuOpen ? <FaArrowCircleLeft className="text-white text-[30px] cursor-pointer" /> : <HiOutlineMenu className="text-white text-[30px] cursor-pointer" />}
                </div>
                <img className="w-[80px] h-[40px]" src={logos} alt="Logo" />

                {/* Menu dropdown chỉ hiển thị khi mở */}
                <ul className={`absolute md:relative top-full left-0 right-0 p-4 md:p-0 flex flex-col md:flex-row gap-4 text-white text-[18px] transition-all duration-500 ${menuOpen ? "flex bg-gradient-to-r from-black via-gray-700 to-zinc-400" : "hidden"} md:flex md:bg-transparent`}>
                    {menu_client.map((e, i) => (
                        <Link className="hover:text-orange-200 transition duration-1000 ease-in" key={i} to={e.path}>{e.title}</Link>
                    ))}
                </ul>

                <div className="flex gap-3 items-center">
                    {isLogin ? <div className="relative">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleUserMenu}>
                            <div className="">
                                <img className='rounded-full w-10 h-10 object-cover' src={isLogin?.imgUrl || avatarDefault} alt="" />
                            </div>
                            {showUserMenu ? (
                                <IoIosArrowUp className='text-[20px] text-white font-semibold' />
                            ) : (
                                <IoIosArrowDown className='text-[20px] text-white font-semibold' />
                            )}
                        </div>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl z-50 text-gray-800 p-4">
                                <div className="flex flex-col items-center mb-4">
                                    <img className="w-20 h-20 rounded-full object-cover" src={isLogin?.imgUrl || avatarDefault} alt="avatar" />
                                    <p className="mt-2 text-sm font-medium text-gray-700">{isLogin?.email}</p>
                                </div>
                                <div className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-full">
                                        <IoPerson className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Profile</p>
                                        <p className="text-xs text-gray-500">Update your profile</p>
                                    </div>
                                </div>
                                <Link to={'/moviebookingrecord'} className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
                                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                                        <FaHistory className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Bookings Record</p>
                                        <p className="text-xs text-gray-500">My orders</p>
                                    </div>
                                </Link>
                                <div className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
                                    <div className="p-2 bg-teal-100 text-teal-600 rounded-full">
                                        <IoMdSettings className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Settings</p>
                                        <p className="text-xs text-gray-500">Update dashboard</p>
                                    </div>
                                </div>
                                <div onClick={handleLogout} className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all">
                                    <div className="p-2 bg-red-100 text-red-600 rounded-full">
                                        <IoLogOut className="text-xl" />
                                    </div>
                                    <p className="font-medium text-sm">Logout</p>
                                </div>
                            </div>

                        )}
                    </div> : <button onClick={handleOpen} className="text-white cursor-pointer whitespace-nowrap px-4 py-2 border-2 border-white rounded-lg bg-transparent hover:bg-white hover:text-black transition duration-1000 ease-in">
                        Login
                    </button>}
                </div>
            </div>
        </div>

    );
}

export default HeaderClient;
