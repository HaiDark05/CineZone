import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

function TableBookingRecords(props) {
    const [page, setPage] = useState(0);
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
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: 'black' }}>
                        <TableRow>
                            <TableCell align="center" sx={{ color: 'white' }}>#</TableCell>     
                            <TableCell align="center" sx={{ color: 'white' }}>Name Movie</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Booking Date</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Seat Number</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Movie Screening</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Cinema</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Address</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Total Amount</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Payment Status</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array(5).fill(null).map((_, index) => (
                            <TableRow
                                // key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    1
                                </TableCell>
                                <TableCell align="center">
                                    Doraemon
                                </TableCell>
                                <TableCell align="center">
                                    06/04/2025
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Tooltip arrow>
                                        <span>A5, A6, A7</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    16:00 | 03/04/2025
                                </TableCell>
                                <TableCell align="center">
                                    RIO
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Tooltip arrow>
                                        <span>đường 2/9 - Quận Hải Châu - Thành phố Đà Nẵng</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    380.000 <sup>đ</sup>
                                </TableCell>
                                <TableCell align="center">
                                    Đã Thanh Toán
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex justify-center items-center">
                                        <Button
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
                        // count={actors.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableBookingRecords;