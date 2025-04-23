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
import { ContextCategories } from '../../../context/CategoryProvider';
import axios from 'axios';
import ModalDelete from '../../../components/ModalDelete';

function TableCategories({ setOpen, setCategory, searchObject }) {
    const { categories, update, setUpdate } = useContext(ContextCategories);
    const [page, setPage] = useState(0);
    const [openDeleted, setOpenDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(null);
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

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/categories/${idDeleted}`);
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
                            <TableCell align="center" sx={{ color: 'white' }}>Category Name</TableCell>
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
                                            onClick={() => { setOpen(true); setCategory(row) }}
                                            sx={{
                                                backgroundColor: 'blue',
                                                '&:hover': {
                                                    backgroundColor: '#FFD700',
                                                },
                                            }}
                                            variant="contained"
                                        >
                                            <FaPencilAlt />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setIdDeleted(row.id);
                                            }}
                                            sx={{
                                                marginLeft: "10px",
                                                backgroundColor: 'red',
                                                '&:hover': {
                                                    backgroundColor: 'darkred',
                                                },
                                            }}
                                            variant="contained"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        count={categories.length}
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

export default TableCategories;
