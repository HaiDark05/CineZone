import React, { useContext, useState } from 'react';
import { ContextFood } from '../../../../context/FoodProvider';
import axios from 'axios';
import { deleteImageFromCloudinary } from '../../../../config/cloudinaryConfig';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import ModalDelete from '../../../../components/ModalDelete';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { getOjectById } from '../../../../utils/FunctionConvert';

function TableFood({ setOpen, setFood, searchObject, food }) {
    const { foodSV, update, setUpdate } = useContext(ContextFood)
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

    const filteredFood = foodSV.filter((food) =>
        food.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredFood?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        if (food.imgUrl && food.imgUrl.includes('cloudinary.com')) {
            // Lấy `public_id` từ URL của Cloudinary
            const publicId = food.imgUrl
                .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
                .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
            await deleteImageFromCloudinary(publicId);
        }

        await axios.delete(`http://localhost:8080/api/food/${food.id}`);
        setUpdate(!update);
        setOpenDeleted(false);
    }
    return (
        <div className="">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Img Url</TableCell>
                            <TableCell align="center">Name TypeChair</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Discount</TableCell>
                            <TableCell align="center">Cinema</TableCell>
                            <TableCell align="center">Action</TableCell>
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
                                    <div className="flex justify-center items-center">
                                        <img src={row.imgUrl} className='w-10 h-10 rounded-lg' alt="" />
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.price}
                                </TableCell>
                                <TableCell align="center">
                                    {row.discount}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(cinemas, row.id_cinema)?.name}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() => { setOpen(true); setFood(row) }}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setFood(row);
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
                        count={foodSV.length}
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

export default TableFood;