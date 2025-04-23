import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { FaHandPointRight } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { menus } from '../../../utils/Containts';
import { Link } from 'react-router-dom';
import { logos } from '../../../utils/Containts';
function Menu(props) {
    const [open, setOpen] = useState("");
    const [openMenu, setOpenMenu] = useState(false)
    const handleopen = () => {
        setOpenMenu(!openMenu);
    }
    return (
        <div className='m-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 p-5 max-md:w-full max-md:p-3 md:h-screen'>
            <div className="flex items-center gap-2 relative max-md:justify-between max-md:items-center">
                {openMenu ? <h1 className="font-semibold text-[24px] text-center md:block text-red-800/80">
                    CineZone<span className="text-teal-300">Admin</span>
                </h1> : <img src={logos} className='w-[60px] h-[50px] rounded-lg' alt="" />}
                <div onClick={(handleopen)} className="p-2 rounded-full bg-amber-300/95 text-white md:absolute md:top-0 md:-right-[20px] md:translate-x-1/2 max-md:mt-2 flex items-center justify-center transition duration-700 hover:bg-amber-600/95">
                    {openMenu ? <FaBars /> : <FaHandPointRight />}
                </div>
            </div>

            <div className={`max-md:${openMenu ? 'block' : 'hidden'}`}>
                <div className="">
                    <Link to={'/'} className="flex p-2 items-center gap-2 bg-amber-300/75 rounded-lg mt-2 text-white transition duration-700 hover:bg-amber-600/95">
                        <RxDashboard />
                        {openMenu && <h1>DashBoard</h1>}
                    </Link>
                </div>
                {openMenu && <h1 className='font-semibold text-teal-300 mt-2'>UI ELEMENTS</h1>}
                <div className="">
                    <Link to={'/categories'} className="flex items-center p-2 gap-2 bg-amber-300/75 rounded-lg mt-2 text-white transition duration-700 hover:bg-amber-600/95">
                        <BiSolidCategory />
                        {openMenu && <h1>Categories</h1>}
                    </Link>
                </div>
                {openMenu && <h1 className='font-semibold text-teal-300 mt-2'>FORMS AND DATAS</h1>}
                {menus.map((e, index) => (
                    <div className='relative' onClick={() => setOpen(open === e.id ? null : e.id)}>
                        <div className="flex items-center justify-between p-2 gap-2 bg-amber-300/75 rounded-lg mt-2 text-white transition duration-700 hover:bg-amber-600/95">
                            <div className="flex items-center gap-2">
                                {e.icon}
                                {openMenu && e.title}
                            </div>
                            {e.id === open ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
                        </div>
                        {e.id === open && <div className={`mt-2 p-2 text-gray-700 flex flex-col list-none space-y-2 z-10  whitespace-nowrap ${openMenu ? "" : "md:absolute md:top-0 md:right-0 md:translate-x-full"}`}>
                            {e.items.map((a, index) => (
                                <Link key={index} to={a.path} className='hover:bg-gray-100 cursor-pointer p-1 bg-orange-200 rounded-lg font-semibold' >{a.title}</Link>
                            ))}
                        </div>}
                    </div>
                ))}

                {openMenu && <h1 className='font-semibold text-teal-300 mt-2'>USER</h1>}
                <div className="">
                    <Link to={'/customeraccount'} className="flex items-center p-2 gap-2 bg-amber-300/75 rounded-lg mt-2 text-white transition duration-700 hover:bg-amber-600/95">
                        <FaRegUserCircle />
                        {openMenu && <h1>Customer Account</h1>}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;