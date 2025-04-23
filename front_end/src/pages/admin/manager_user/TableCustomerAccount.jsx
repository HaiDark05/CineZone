import { Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import ModalDelete from '../../../components/ModalDelete';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { MdVisibilityOff } from 'react-icons/md';
import { ContextAccounts } from '../../../context/AccountsProvider';
import { deleteImageFromCloudinary } from '../../../config/cloudinaryConfig';
import axios from 'axios';
import { ROLES } from '../../../utils/Containts';

function TableCustomerAccount({ setOpen, setAccount, searchObject, account }) {
    const { accounts, update, setUpdate } = useContext(ContextAccounts);
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

    // Lọc tất cả user KHÔNG phải là admin và có tên phù hợp với từ khóa tìm kiếm
    const filteredAccount = accounts
    .filter((account) => account.id_role !== ROLES.ADMIN) // Bỏ admin
    .filter((account) =>
        account.user_name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredAccount?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        if (account.imgUrl && account.imgUrl.includes('cloudinary.com')) {
            // Lấy `public_id` từ URL của Cloudinary
            const publicId = account.imgUrl
                .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
                .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
            await deleteImageFromCloudinary(publicId);
        }

        await axios.delete(`http://localhost:8080/api/accounts/${account.id}`);
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
                            <TableCell align="center" sx={{ color: 'white' }}>ImgUrl</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>User name</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Password</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Phone</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Gender</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Role</TableCell>
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
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={row.imgUrl}
                                            alt="avatar"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {row.user_name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        sx={{ width: '200px' }}
                                        type={'password'}
                                        value={'•'.repeat(row.pass_word.length)}
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="center">
                                                    <IconButton edge="end">
                                                        <MdVisibilityOff />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {row.phone}
                                </TableCell>
                                <TableCell align="center">
                                    {row.gender}
                                </TableCell>
                                <TableCell align="center">
                                    {row.id_role}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() => { setOpen(true); setAccount(row) }}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setAccount(row);
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
                        count={accounts.length}
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

export default TableCustomerAccount;