import axios from 'axios';
import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Button, TablePagination, Tooltip } from '@mui/material';
import { ContextActors } from '../../../../context/ActorsProvider';
import ModalDelete from '../../../../components/ModalDelete';
import { deleteImageFromCloudinary } from '../../../../config/cloudinaryConfig';

function TableActor({ setOpen, setActor, searchObject, actor }) {
    const { actors, update, setUpdate } = useContext(ContextActors)
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

    const filteredActors = actors.filter((actor) =>
        actor.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredActors?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        if (actor.imgUrl && actor.imgUrl.includes('cloudinary.com')) {
            // Lấy `public_id` từ URL của Cloudinary
            const publicId = actor.imgUrl
                .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
                .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
            await deleteImageFromCloudinary(publicId);
        }

        await axios.delete(`http://localhost:8080/api/actors/${actor.id}`);
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
                            <TableCell align="center" sx={{ color: 'white' }}>Actor Name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Description</TableCell>
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
                                    <img src={row.imgUrl} className='w-12 h-12 rounded-lg' alt="" />
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Tooltip title={row.description} arrow>
                                        <span>{row.description.length > 50 ? row.description.slice(0, 50) + "..." : row.description}</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() => { setOpen(true); setActor(row) }}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setActor(row);
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
                        count={actors.length}
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

export default TableActor;