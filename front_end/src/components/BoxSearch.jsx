import React from 'react';
import { FaSearch } from "react-icons/fa";
import { Button } from '@mui/material';

function BoxSearch({ addItem, title, nameBtn, searchObject, setSearchObject}) {
    return (
        <div className='m-auto p-3 flex md:justify-between md:items-center max-md:flex-col gap-2'>
            <h1 className='font-semibold text-[18px] whitespace-nowrap'>List {title}</h1>
            <div className="box-search flex">
                <div className="bg-slate-400 p-2 w-[30px] flex justify-center items-center transition duration-700 ease-in hover:bg-lime-500 hover:text-zinc-500 rounded-tl-lg rounded-bl-lg">
                    <FaSearch className='font-bold' />
                </div>
                <input type="text" placeholder="Search by Name" value={searchObject} onChange={(e) => setSearchObject(e.target.value)}  className='border-2 border-slate-600 rounded-tr-lg rounded-br-lg px-2 w-full md:w-[30vw]' />
            </div>
            <Button onClick={addItem} sx={{ whiteSpace: 'nowrap' }} variant="contained">Add {nameBtn}</Button>
        </div>
    );
}

export default BoxSearch;