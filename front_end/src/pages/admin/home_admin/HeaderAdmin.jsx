import React, { useState } from 'react';
import { FaLastfm, FaSearch } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function HeaderAdmin(props) {
    const [openAvatar, setOpenAvatar] = useState(false);
    return (
        <div className='p-3 m-auto flex justify-between items-center'>
            <div className='ml-2'>
                <h1 className='font-bold text-[24px]'>Wellcome, <span className='text-blue-500'>HaiLy</span></h1>
                <h1 className='text-slate-400'>Your performance summary this week</h1>
            </div>
            <div className="flex gap-5 text-[25px] items-center">
                <FaSearch />
                <IoMdMail />
                <FaBell />
                <div className="flex items-center gap-1 relative">
                    <img src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?ga=GA1.1.1359579831.1731550653&semt=ais_incoming" className='rounded-full h-[40px] w-[40px]' alt="" />
                    <div onClick={() => setOpenAvatar(!openAvatar)}>
                        {openAvatar ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        {openAvatar ? <div className="absolute top-[60px] right-0 w-[150px] bg-white shadow-md rounded-md py-2 z-10">
                            <ul className="text-left text-[16px] font-semibold">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Settings
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;