import React, { useContext, useState } from 'react';
import { ContextCharacters } from '../../../../context/CharacterProvider';
import { deleteImageFromCloudinary } from '../../../../config/cloudinaryConfig';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import ModalDelete from '../../../../components/ModalDelete';

function TableCharacter({ setOpen, setCharacter, searchObject, character }) {
    const { characters, update, setUpdate } = useContext(ContextCharacters)
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

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredCharacters?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        if (character.imgUrl && character.imgUrl.includes('cloudinary.com')) {
            // Lấy `public_id` từ URL của Cloudinary
            const publicId = character.imgUrl
                .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
                .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
            await deleteImageFromCloudinary(publicId);
        }

        await axios.delete(`http://localhost:8080/api/characters/${character.id}`);
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
                            <TableCell align="center">Name Character</TableCell>
                            <TableCell align="center">Description</TableCell>
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
                                <TableCell align="center" component="th" scope="row" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={row.imgUrl} className='w-10 h-10 rounded-lg' alt="" />
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
                                    <div className="">
                                        <Button
                                            onClick={() => { setOpen(true); setCharacter(row) }}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setCharacter(row);
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
                        count={characters.length}
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

export default TableCharacter;