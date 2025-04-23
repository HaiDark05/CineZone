import React from 'react';
import { FaSearch } from "react-icons/fa";

function BoxSearchClient({ title, searchObject, setSearchObject }) {

    return (
        <div className="relative w-full p-3 flex items-center">
            <h1 className="font-semibold text-[18px] whitespace-nowrap">List {title}</h1>
            <div className="absolute left-1/2 -translate-x-1/2 flex">
                <div className="box-search flex">
                    <div className="bg-slate-400 p-2 w-[30px] flex justify-center items-center transition duration-700 ease-in hover:bg-lime-500 hover:text-zinc-500 rounded-tl-lg rounded-bl-lg">
                        <FaSearch className="font-bold" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchObject}
                        onChange={(e) => setSearchObject(e.target.value)}
                        className="border-2 border-slate-600 rounded-tr-lg rounded-br-lg px-2 w-full md:w-[30vw]"
                    />
                </div>
            </div>
        </div>

    );
}

export default BoxSearchClient;
