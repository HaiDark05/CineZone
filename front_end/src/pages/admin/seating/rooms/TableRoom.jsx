import React, { useContext, useState } from 'react';
import { ContextRooms } from '../../../../context/RoomsProvider';
import { ContextRegions } from '../../../../context/RegionsProvider';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import ModalDelete from '../../../../components/ModalDelete';
import { FaTrash } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { getOjectById } from '../../../../utils/FunctionConvert';
import { SiCinema4D } from "react-icons/si";
import axios from 'axios';
import SeatingLayout from './SeatingLayout';

function TableRoom({ setOpen, setRoom, searchObject, room, generateGrid, setSelectedCells }) {
    const { rooms, update, setUpdate } = useContext(ContextRooms);
    const { regions } = useContext(ContextRegions);
    const { locations } = useContext(ContextLocations);
    const { cinemas } = useContext(ContextCinemas);
    const [page, setPage] = useState(0);
    const [openDeleted, setOpenDeleted] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    // Xử lý khi thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý khi thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay lại trang đầu tiên
    };

    const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredRooms?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/rooms/${room.id}`);
        setUpdate(!update);
        setOpenDeleted(false);
    }

    const handleEdit = (row) => {
        setOpen(true);
        setRoom(row);
        generateGrid(row);
        setSelectedCells(row.list_chair);
    }
    return (
        <div className="">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#1F2937' }}>
                        <TableRow sx={{ whiteSpace: 'nowrap'}}>
                            <TableCell align="center" sx={{ color: 'white' }}>#</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Img Cinema</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Cinema Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Location</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Region</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Room Number</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Room</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToDisplay.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {index + 1 + page * rowsPerPage}
                                </TableCell>
                                <TableCell sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} align="center">
                                    <img
                                        src={getOjectById(cinemas, row.id_cinema)?.imgUrl}
                                        alt="Cinema"
                                        className='w-16 h-10 rounded-lg'
                                    />
                                </TableCell>
                                <TableCell align="center">{getOjectById(cinemas, row.id_cinema)?.name}</TableCell>
                                <TableCell align="center">{getOjectById(locations, row.id_location)?.name}</TableCell>
                                <TableCell align="center">{getOjectById(regions, row.id_region)?.name}</TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title={<SeatingLayout row={row} />} placement="top">
                                        <Button variant="contained">
                                            <SiCinema4D />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() => handleEdit(row)}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setRoom(row);
                                            }}
                                            sx={{
                                                marginLeft: "10px",
                                                backgroundColor: 'red', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: 'darkred' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaTrash /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        count={rooms.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
            <ModalDelete openDeleted={openDeleted} setOpenDeleted={setOpenDeleted} handleDelete={handleDelete} />
        </div>
    );
}

export default TableRoom;