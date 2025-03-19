import React, { useContext, useState } from 'react';
import { ContextMovies } from '../../../../context/MovieProvider';
import ModalDelete from '../../../../components/ModalDelete';
import { Button, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { deleteImageFromCloudinary } from '../../../../config/cloudinaryConfig';
import { ContextAuthors } from '../../../../context/AuthorsProvider';
import { getOjectById } from "../../../../utils/FunctionConvert";
import Tooltip from "@mui/material/Tooltip";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { ContextCategories } from '../../../../context/CategoryProvider';
import { ContextCharacters } from '../../../../context/CharacterProvider';
import { FaUsersLine } from "react-icons/fa6";
import { ContextActors } from '../../../../context/ActorsProvider';
function TableMovie({ setOpen, setMovie, searchObject, movie }) {
    const { movies, update, setUpdate } = useContext(ContextMovies)
    const [page, setPage] = useState(0);
    const [openDeleted, setOpenDeleted] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { authors } = useContext(ContextAuthors);
    const { categories } = useContext(ContextCategories);
    const { characters } = useContext(ContextCharacters);
    const { actors } = useContext(ContextActors);

    // Xử lý khi thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý khi thay đổi số hàng trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay lại trang đầu tiên
    };


    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchObject.toLowerCase())
    );

    // Xử lý các hàng hiển thị trong một trang
    const rowsToDisplay = filteredMovies?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDelete = async () => {
        if (movie.imgUrl && movie.imgUrl.includes('cloudinary.com')) {
            // Lấy `public_id` từ URL của Cloudinary
            const publicId = movie.imgUrl
                .split('/').slice(-2).join('/')  // Lấy thư mục và tên file từ URL
                .replace(/\.[^/.]+$/, '');       // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
            await deleteImageFromCloudinary(publicId);
        }

        await axios.delete(`http://localhost:8080/api/movies/${movie.id}`);
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
                            <TableCell align="center">Name Movie</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Url Trailer</TableCell>
                            <TableCell align="center">Duration</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Entities</TableCell>
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
                                <TableCell sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={row.imgUrl} className='w-10 h-14 rounded-lg' alt="" />
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Tooltip title={row.description} arrow>
                                        <span>{row.description.length > 50 ? row.description.slice(0, 50) + "..." : row.description}</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <Tooltip title={row.urlTrailer} arrow>
                                        <span>{row.urlTrailer.length > 50 ? row.urlTrailer.slice(0, 50) + "..." : row.urlTrailer}</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">{row.duration}</TableCell>
                                <TableCell align="center">{getOjectById(authors, row.id_author)?.name}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title={row.listCate.map((e, index) => (
                                        row.listCate.length == index + 1 ? getOjectById(categories, e)?.name : getOjectById(categories, e)?.name + ", "
                                    ))} arrow >
                                        <Button variant="contained">
                                            <BiSolidCategoryAlt />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title={
                                        <div className='flex gap-1'>
                                            {row.listActor.map((e, index) => (
                                                <div>
                                                    <img className='w-10 h-10 rounded-full' src={getOjectById(actors, e)?.imgUrl} alt="" />
                                                </div>
                                            ))}
                                            {row.listCharacter.map((e, index) => (
                                                <div>
                                                    <img className='w-10 h-10 rounded-full' src={getOjectById(characters, e)?.imgUrl} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    } arrow >
                                        <Button variant="contained">
                                            <BiSolidCategoryAlt />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex items-center justify-center">
                                        <Button
                                            onClick={() => { setOpen(true); setMovie(row) }}
                                            sx={{
                                                backgroundColor: 'blue', // Màu nền của nút
                                                '&:hover': {
                                                    backgroundColor: '#FFD700' // Màu nền khi hover
                                                }
                                            }} variant="contained"><FaPencilAlt /></Button>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleted(true); setMovie(row);
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
                        count={movies.length}
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

export default TableMovie;