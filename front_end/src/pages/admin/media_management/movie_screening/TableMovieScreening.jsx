import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import React, { useContext, useState } from 'react';
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { ContextMovieScreens } from '../../../../context/MovieScreenProvider';
import axios from 'axios';
import { getOjectById } from '../../../../utils/FunctionConvert';
import { ContextRooms } from '../../../../context/RoomsProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextRegions } from '../../../../context/RegionsProvider';
import { ContextMovies } from '../../../../context/MovieProvider';
import ModalDelete from '../../../../components/ModalDelete';
import { TbBrandCinema4D } from "react-icons/tb";
import { IoIosTime } from "react-icons/io";

function TableMovieScreening({ setOpen, setMovieScreen, searchObject, movieScreen }) {
    const { movieScreens, setUpdate, update } = useContext(ContextMovieScreens);
    const { rooms } = useContext(ContextRooms);
    const { cinemas } = useContext(ContextCinemas);
    const { regions } = useContext(ContextRegions);
    const { movies } = useContext(ContextMovies);
    const { locations } = useContext(ContextLocations);
    const [page, setPage] = useState(0);
    const [openDeleted, setOpenDeleted] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý khi thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay lại trang đầu tiên
    };

    const filteredMovieScreen = movieScreens.filter((movieScreen) =>
        getOjectById(movies, movieScreen.id_movie)?.name?.toLowerCase().includes(searchObject?.toLowerCase())
    );


    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredMovieScreen?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/moviescreens/${movieScreen.id}`);
        setUpdate(!update);
        setOpenDeleted(false);
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#1F2937' }}>
                        <TableRow sx={{ whiteSpace: 'nowrap'}}>
                            <TableCell align="center" sx={{ color: 'white' }}>#</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Movie Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Room</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Cinema</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Location</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Region</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Release date</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Screening time</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Ratio</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToDisplay.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    {getOjectById(movies, row.id_movie)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title={row.id_room.map((e, index) => (
                                        row.id_room.length == index + 1 ? getOjectById(rooms, e)?.name : getOjectById(rooms, e)?.name + ", "
                                    ))} arrow >
                                        <Button variant="contained">
                                            <TbBrandCinema4D />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center" >
                                    {getOjectById(cinemas, row.id_cinema)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(locations, row.id_location)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(regions, row.id_region)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.release_date}
                                </TableCell>

                                {/* Hiển thị thời gian chiếu khi hover */}
                                <TableCell
                                    align="center"
                                    className="relative"
                                >
                                    <Tooltip title={row.showtime?.map((element,index) => row.showtime.length == index + 1 ? element : element + ", ")} arrow >
                                        <Button variant="contained">
                                        <IoIosTime />
                                        </Button>
                                    </Tooltip>
                                </TableCell>

                                <TableCell align="center">
                                    {row.ratio}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => { setOpen(true); setMovieScreen(row) }}
                                        sx={{
                                            backgroundColor: 'blue',
                                            '&:hover': { backgroundColor: '#FFD700' }
                                        }}
                                        variant="contained"
                                    >
                                        <FaPencilAlt />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setOpenDeleted(true); setMovieScreen(row);
                                        }}
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        count={movieScreens.length}
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

export default TableMovieScreening;
