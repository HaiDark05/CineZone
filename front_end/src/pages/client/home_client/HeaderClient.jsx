import React, { useEffect, useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import { logos, menu_client } from '../../../utils/Containts';

function HeaderClient({ handleOpen }) {
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

        <div className="flex gap-2">
            <button onClick={handleOpen} className="text-white cursor-pointer whitespace-nowrap px-4 py-2 border-2 border-white rounded-lg bg-transparent hover:bg-white hover:text-black transition duration-1000 ease-in">
                Login
            </button>
        </div>
    </div>
</div>

    );
}

export default HeaderClient;
