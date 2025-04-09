import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function BoxSearchClient({ title, searchObject, setSearchObject }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSearchByDate = () => {
        console.log('Searching for records between:', startDate, 'and', endDate);
    };

    return (
        <div className="m-auto p-3 flex md:justify-between md:items-center max-md:flex-col gap-3">
            <h1 className="font-semibold text-[18px] whitespace-nowrap">List {title}</h1>
            <div className="box-search flex">
                <div className="bg-slate-400 p-2 w-[30px] flex justify-center items-center transition duration-700 ease-in hover:bg-lime-500 hover:text-zinc-500 rounded-tl-lg rounded-bl-lg">
                    <FaSearch className='font-bold' />
                </div>
                <input type="text" placeholder="Search by Name" value={searchObject} onChange={(e) => setSearchObject(e.target.value)} className='border-2 border-slate-600 rounded-tr-lg rounded-br-lg px-2 w-full md:w-[30vw]' />
            </div>
            <div className="flex gap-4 mt-3">
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: '#3f51b5', // Thay đổi màu nhãn
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#3f51b5', // Màu viền của TextField
                            },
                            '&:hover fieldset': {
                                borderColor: '#3f51b5', // Màu viền khi hover
                            },
                        },
                    }}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: '#3f51b5',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#3f51b5',
                            },
                            '&:hover fieldset': {
                                borderColor: '#3f51b5',
                            },
                        },
                    }}
                />
            </div>
            <div className="mt-3">
                <Button
                    onClick={handleSearchByDate}
                    sx={{
                        whiteSpace: 'nowrap',
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2c387e',
                        },
                    }}
                    variant="contained"
                >
                    Search by Date
                </Button>
            </div>
        </div>
    );
}

export default BoxSearchClient;
