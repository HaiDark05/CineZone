import React, { useEffect } from 'react';
import MenuMember from './MenuMember';
import { Outlet } from 'react-router-dom';

function Members(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className="bg-gradient-to-r from-black via-gray-700 to-zinc-400">
            <div className="w-[80%] m-auto flex p-4">
                {/* Sidebar */}
                <MenuMember />
                {/* Content */}
                <div className="flex-1">
                <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Members;