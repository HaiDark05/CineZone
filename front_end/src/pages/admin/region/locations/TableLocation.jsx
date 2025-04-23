import React, { useContext, useState } from 'react';
import { ContextLocations } from '../../../../context/LocationProvider';
import axios from 'axios';
import { deleteImageFromCloudinary } from '../../../../config/cloudinaryConfig';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Button, TablePagination } from '@mui/material';
import ModalDelete from '../../../../components/ModalDelete';
import { getOjectById } from '../../../../utils/FunctionConvert';
import { ContextRegions } from '../../../../context/RegionsProvider';

function TableLocation({ setOpen, setLocation, searchObject, location }) {
    const { locations, update, setUpdate } = useContext(ContextLocations)
    const { regions } = useContext(ContextRegions)
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

    const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredLocations?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/location/${location.id}`);
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
                            <TableCell align="center" sx={{ color: 'white' }}>Location Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Description</TableCell>
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
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">
                                    {getOjectById(regions, row.id_region)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() => { setOpen(true); setLocation(row) }}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setLocation(row);
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
                        count={locations.length}
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

export default TableLocation;