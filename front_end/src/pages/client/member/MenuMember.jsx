import React, { useState } from 'react';
import { menuMember } from '../../../utils/Containts';
import { Link } from 'react-router-dom';

function MenuMember() {
    const [selected, setSelected] = useState(menuMember[0].path);

    return (
        <div className="w-64">
            <div className="bg-white shadow-lg p-4 space-y-2 rounded-xl">
                {menuMember.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        onClick={() => setSelected(item.path)}
                        className={`block px-4 py-2 text-[18px] rounded-lg font-medium transition-all duration-200 ${
                            selected === item.path
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black'
                        }`}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MenuMember;
