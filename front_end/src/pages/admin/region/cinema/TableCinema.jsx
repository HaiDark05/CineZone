import React, { useContext, useState } from 'react';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { ContextLocations } from '../../../../context/LocationProvider';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import ModalDelete from '../../../../components/ModalDelete';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { getOjectById } from '../../../../utils/FunctionConvert';
import { ContextRegions } from '../../../../context/RegionsProvider';

function TableCinema({ setOpen, setCinema, searchObject, cinema }) {
    const { cinemas, update, setUpdate } = useContext(ContextCinemas);
    const { locations } = useContext(ContextLocations);
    const { regions } = useContext(ContextRegions);
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

    const filteredCinemas = cinemas.filter((cinema) =>
        cinema.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredCinemas?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/cinemas/${cinema.id}`);
        setUpdate(!update);
        setOpenDeleted(false);
    }
    return (
        <div className="">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#1F2937' }}>
                        <TableRow sx={{ whiteSpace: 'nowrap'}}>
                            <TableCell align="center" sx={{ color: 'white' }}>#</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Img Url</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Cinema Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Address</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Location</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Region</TableCell>
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
                                <TableCell align="center" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={row.imgUrl} className='w-16 h-10 rounded-lg' alt="" />
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.address}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(locations, row.id_location)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(regions, row.id_region)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() => { setOpen(true); setCinema(row) }}
                                            sx={{
                                                backgroundColor: 'blue',
                                                '&:hover': {
                                                    backgroundColor: '#FFD700'
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setCinema(row);
                                            }}
                                            sx={{
                                                marginLeft: "10px",
                                                backgroundColor: 'red',
                                                '&:hover': {
                                                    backgroundColor: 'darkred'
                                                }
                                            }} variant="contained"><FaTrash /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        count={cinemas.length}
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

export default TableCinema;