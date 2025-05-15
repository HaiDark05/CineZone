import React, { useContext, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import { ContextBookings } from '../../../../context/BookingsProvider';
import { ContextMovieScreens } from '../../../../context/MovieScreenProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextRegions } from '../../../../context/RegionsProvider';
import { ContextMovies } from '../../../../context/MovieProvider';
import { ContextAccounts } from '../../../../context/AccountsProvider';
import { formatFirebaseDateTime, getOjectById } from '../../../../utils/FunctionConvert';

function TableOrderDetail({ searchObject }) {
    const { accounts } = useContext(ContextAccounts);
    const { bookings } = useContext(ContextBookings);
    const { movieScreens } = useContext(ContextMovieScreens);
    const { cinemas } = useContext(ContextCinemas);
    const { locations } = useContext(ContextLocations);
    const { regions } = useContext(ContextRegions);
    const { movies } = useContext(ContextMovies);
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

    const filteredBookings = bookings.filter((booking) => {
        const accountName = getOjectById(accounts, booking?.id_account)?.user_name || '';

        if (!searchObject || searchObject.trim() === '') return true;

        return accountName.toLowerCase().includes(searchObject.toLowerCase());
    });

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredBookings?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#1F2937' }}>
                        <TableRow sx={{ whiteSpace: 'nowrap'}}>
                            <TableCell align="center" sx={{ color: 'white' }}>#</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Name Account</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Name Movie</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Booking Date</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Seat Number</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Movie Screening</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Cinema</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Address</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Total Chair</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Total Food</TableCell>
                            <TableCell align='center' sx={{ color: 'white' }}>Total Amount</TableCell>
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
                                    {getOjectById(accounts, row?.id_account)?.user_name}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(movies, getOjectById(movieScreens, row?.id_screen)?.id_movie)?.name || "no"}
                                </TableCell>
                                <TableCell align="center">
                                    {row?.booking_date && formatFirebaseDateTime(row.booking_date)}
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Tooltip arrow>
                                        {row?.list_chair?.map((e, index) => (
                                            <span key={index} className='font-normal ml-1'>{e.title}</span>
                                        ))}
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    {row?.time} | {getOjectById(movieScreens, row?.id_screen)?.release_date}
                                </TableCell>
                                <TableCell align="center">
                                    {getOjectById(cinemas, getOjectById(movieScreens, row?.id_screen)?.id_cinema)?.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                    {(() => {
                                        const screen = getOjectById(movieScreens, row?.id_screen);
                                        const cinema = getOjectById(cinemas, screen?.id_cinema);
                                        const location = getOjectById(locations, cinema?.id_location);
                                        const region = getOjectById(regions, location?.id_region);
                                        const fullAddress = `Địa chỉ: ${cinema?.address} - ${location?.name} - Thành Phố ${region?.name}`;

                                        return (
                                            <Tooltip arrow title={fullAddress}>
                                                <span>{fullAddress}</span>
                                            </Tooltip>
                                        );
                                    })()}
                                </TableCell>
                                <TableCell align="center">
                                    {row?.totalChair.toLocaleString('vi-VN')} <sup>đ</sup>
                                </TableCell>
                                <TableCell align="center">
                                    {row?.totalFood.toLocaleString('vi-VN')} <sup>đ</sup>
                                </TableCell>
                                <TableCell align="center">
                                    {row?.total.toLocaleString('vi-VN')} <sup>đ</sup>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        count={bookings.length}
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

export default TableOrderDetail;