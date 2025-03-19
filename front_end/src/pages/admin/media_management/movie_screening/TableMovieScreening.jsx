import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { logos } from '../../../../utils/Containts';

function TableMovieScreening(props) {
    const [hoveredRow, setHoveredRow] = useState(null);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Movie</TableCell>
                            <TableCell align="center">Room</TableCell>
                            <TableCell align="center">Cinema</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Region</TableCell>
                            <TableCell align="center">Release date</TableCell>
                            <TableCell align="center">Screening time</TableCell>
                            <TableCell align="center">Ratio</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: 5 }, (_, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                    Bo Gia
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip
                                        title={<img src={logos} alt="" className="w-20 h-20" />}
                                        arrow
                                    >
                                        <span className="cursor-pointer text-indigo-600">Phong 201</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    Rio
                                </TableCell>
                                <TableCell align="center">
                                    Lien Chieu
                                </TableCell>
                                <TableCell align="center">
                                    Da Nang
                                </TableCell>
                                <TableCell align="center">
                                    20/08/2024
                                </TableCell>

                                {/* Hiển thị thời gian chiếu khi hover */}
                                <TableCell
                                    align="center"
                                    className="relative"
                                    onMouseEnter={() => setHoveredRow(index)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                >
                                    Hover to show screenings
                                    {hoveredRow === index && (
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 p-2 shadow-lg rounded-md flex gap-2 flex-wrap justify-center z-50">
                                            {Array.from({ length: 8 }, (_, i) => (
                                                <Tooltip key={i} title={`Screening Time ${i + 1}`} arrow>
                                                    <span className="border border-lime-400 w-16 p-2 rounded-md cursor-pointer transition-all duration-300 hover:border-slate-600 hover:text-indigo-600">
                                                        {`${(8 + i * 2) % 24}:00`}
                                                    </span>
                                                </Tooltip>
                                            ))}
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell align="center">
                                    0,5
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        sx={{
                                            backgroundColor: 'blue',
                                            '&:hover': { backgroundColor: '#FFD700' }
                                        }}
                                        variant="contained"
                                    >
                                        <FaPencilAlt />
                                    </Button>
                                    <Button
                                        sx={{
                                            marginLeft: "10px",
                                            backgroundColor: 'red',
                                            '&:hover': { backgroundColor: 'darkred' }
                                        }}
                                        variant="contained"
                                    >
                                        <FaTrash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableMovieScreening;
