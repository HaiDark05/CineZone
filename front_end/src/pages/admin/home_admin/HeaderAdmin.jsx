import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMdMail, IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoLogOut, IoPerson } from 'react-icons/io5';
import { avatarDefault } from '../../../utils/Containts';
import { ContextAuth } from '../../../context/AuthProvider';
import { Link } from 'react-router-dom';

function HeaderAdmin(props) {
    const [openAvatar, setOpenAvatar] = useState(false);
    const { isLogin, logout } = useContext(ContextAuth);
    return (
        <div className='p-3 m-auto flex justify-between items-center'>
            <div className='ml-2'>
                <h1 className='font-bold text-[24px]'>Wellcome, <span className='text-blue-500'>{isLogin?.user_name}</span></h1>
                <h1 className='text-slate-400'>Your performance summary this week</h1>
            </div>
            <div className="flex gap-5 text-[25px] items-center">
                <FaSearch />
                <IoMdMail />
                <FaBell />
                <div className="flex items-center gap-1 relative">
                    <img src={isLogin?.imgUrl || avatarDefault} className='rounded-full h-[40px] w-[40px] object-cover' alt="" />
                    <div onClick={() => setOpenAvatar(!openAvatar)} className=' cursor-pointer'>
                        {openAvatar ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        {openAvatar ? <div className="p-4 absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-50 text-black">
                            <div className="text-center mb-2">
                                <div className="flex justify-center">
                                    <img className='rounded-full w-24 h-24' src={isLogin?.imgUrl || avatarDefault} alt="" />
                                </div>
                                <h1 className='text-[16px]'>{isLogin?.email}</h1>
                            </div>
                            <Link to={'/profileadmin'} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                <div className="p-2 rounded-full bg-orange-300">
                                    <IoPerson className='text-[20px]' />
                                </div>
                                <div className="">
                                    <h1 className='text-[16px] font-semibold'>Profile</h1>
                                    <h1 className='text-[14px] text-gray-500'>Update Your Profile</h1>
                                </div>
                            </Link>
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                <div className="p-2 rounded-full bg-teal-500">
                                    <IoMdSettings className='text-[20px]' />
                                </div>
                                <div className="">
                                    <h1 className='text-[16px] font-semibold'>Settings</h1>
                                    <h1 className='text-[14px] text-gray-500'>Update Dashboard</h1>
                                </div>
                            </div>
                            <div onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                <div className="p-2 rounded-full bg-lime-500">
                                    <IoLogOut className='text-[20px]' />
                                </div>
                                <h1  className='text-[16px] font-semibold'>Logout</h1>
                            </div>
                        </div> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;