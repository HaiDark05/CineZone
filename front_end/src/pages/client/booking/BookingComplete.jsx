import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function BookingComplete(props) {
    return (
        <div>
            <div className="w-[50%] m-auto p-4">
                <h2 className="text-center text-xl font-semibold mb-4">
                    Bước 4: Kết thúc đặt vé
                </h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" colSpan={2}>THÔNG TIN ĐẶT VÉ</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Người đặt
                                </StyledTableCell>
                                <StyledTableCell align="left">HaiDark</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Ngày đặt
                                </StyledTableCell>
                                <StyledTableCell align="left">04/06/2025</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Phim
                                </StyledTableCell>
                                <StyledTableCell align="left">Emma Và Vương Quốc Tí Hon</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Ghế
                                </StyledTableCell>
                                <StyledTableCell align="left">D01, D02</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Suất chiếu
                                </StyledTableCell>
                                <StyledTableCell align="left">16:10 | 04/06/2025</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Rạp
                                </StyledTableCell>
                                <StyledTableCell align="left">RIO | đường 2 tháng 9 - Quận Liên Chiểu - Thành Phố Đà Nẵng</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Tổng tiền
                                </StyledTableCell>
                                <StyledTableCell align="left">150.000 <sup>đ</sup></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={""}>
                                <StyledTableCell component="th" scope="row">
                                    Trạng thái
                                </StyledTableCell>
                                <StyledTableCell align="left">Đặt vé thành công</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default BookingComplete;