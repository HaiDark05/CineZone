import React, { useContext, useState } from 'react';
import { ContextMovieScreens } from '../../../../context/MovieScreenProvider';
import { useNotification } from '../../../../context/NotificationContext';
import { Autocomplete, Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Paper, styled, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ContextMovies } from '../../../../context/MovieProvider';
import { ContextRooms } from '../../../../context/RoomsProvider';
import { ContextRegions } from '../../../../context/RegionsProvider';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { filterListById, getOjectById } from '../../../../utils/FunctionConvert';
import { IoIosTrash, IoMdAdd } from "react-icons/io";
import { BiSolidMoviePlay } from "react-icons/bi";
import { ImArrowLeft } from "react-icons/im";
import SeatingLayout from '../../seating/rooms/SeatingLayout';
import ModalChooseMovie from './ModalChooseMovie';
import { logos } from '../../../../utils/Containts';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


function ModalMovieScreening({ open, handleClose, movieScreen, setMovieScreen, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextMovieScreens);
    const { movies } = useContext(ContextMovies);
    const { rooms } = useContext(ContextRooms);
    const { regions } = useContext(ContextRegions);
    const { locations } = useContext(ContextLocations);
    const { cinemas } = useContext(ContextCinemas);
    const [timeInput, setTimeInput] = useState("");
    const [openChooseMovie, setOpenChooseMovie] = useState(false);
    const handleOpenChooseMovie = () => setOpenChooseMovie(true);
    const handleCloseChooseMovie = () => setOpenChooseMovie(false);

    const toggleSelection = (list, item) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    const handleSelectRoom = (roomId) => {
        setMovieScreen(prev => {
            let updatedList = toggleSelection(prev.id_room, roomId);
            return { ...prev, id_room: updatedList };
        })
    };

    const handleSubmit = async () => {
        try {
            if (movieScreen.id) {
                await axios.put(`http://localhost:8080/api/moviescreens/${movieScreen.id}`, movieScreen);
            } else {
                await axios.post("http://localhost:8080/api/moviescreens", movieScreen);
                showNotification('MovieScreen added successfully!', "success");
            }
            handleClose(); // Đóng modal
            setUpdate((prev) => !prev);
        } catch (error) {
            console.error("Error submitting movieScreening:", error);
            showNotification("Error submitting movieScreening!", "error");
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovieScreen((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Xử lý khi nhập giờ
    const handleTimeChange = (e) => {
        setTimeInput(e.target.value);
    };

    // Thêm giờ vào danh sách `showtime`
    const handleAddTime = () => {
        if (timeInput && !movieScreen.showtime.includes(timeInput)) {
            setMovieScreen((prev) => ({
                ...prev,
                showtime: [...prev.showtime, timeInput],
            }));
            setTimeInput("");
        }
    };
    // Xóa giờ khỏi danh sách
    const handleRemoveTime = (time) => {
        setMovieScreen((prev) => ({
            ...prev,
            showtime: prev.showtime.filter((t) => t !== time), // Xóa giờ khỏi mảng
        }));
    };
    const handleBack = () => {
        setMovieScreen(prevData => ({
            ...prevData,
            id_cinema: null
        }));
    };

    const handleChooseMovie = (movie) => {
        setMovieScreen({ ...movieScreen, id_movie: movie })
        handleCloseChooseMovie();
    };
    return (
        <div className="">
            <Dialog open={open} onClose={handleClose} fullWidth PaperProps={{
                sx: {
                    width: "85vw",
                    maxWidth: "none",
                    borderRadius: 2,
                    p: 2,
                },
            }}>
                <DialogTitle>{movieScreen.id ? "Update MovieScreen" : "Add MovieScreen"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Item>
                                <div className='grid grid-cols-2 gap-2'>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        name="release_date"
                                        type="date"
                                        value={movieScreen?.release_date}
                                        onChange={handleChange}
                                    />
                                    <Autocomplete
                                        options={regions}
                                        getOptionLabel={(option) => option?.name}
                                        value={regions.find((region) => region.id === movieScreen?.id_region)}
                                        onChange={(event, newValue) => {
                                            setMovieScreen((prev) => ({
                                                ...prev,
                                                id_region: newValue ? newValue.id : "",
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Region" variant="outlined" name='id_region' fullWidth margin="dense" error={!!errors.id_region}
                                                helperText={errors.id_region} />
                                        )}

                                    />
                                    <TextField
                                        label="Ratio"
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        name="ratio"
                                        type="number"
                                        value={movieScreen?.ratio}
                                        onChange={handleChange}
                                    />
                                    <Autocomplete
                                        options={filterListById(locations, movieScreen.id_region, "id_region")}
                                        getOptionLabel={(option) => option?.name}
                                        value={locations.find((location) => location.id === movieScreen?.id_location)}
                                        onChange={(event, newValue) => {
                                            setMovieScreen((prev) => ({
                                                ...prev,
                                                id_location: newValue ? newValue.id : "",
                                            }));
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select Location" name='id_location' variant="outlined" fullWidth margin="dense" error={!!errors.id_location}
                                                helperText={errors.id_location} />
                                        )}

                                    />
                                    <TextField
                                        label="Time"
                                        type="time"
                                        name="showtime"
                                        margin="dense"
                                        variant="outlined"
                                        value={timeInput}
                                        onChange={handleTimeChange}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true, // Đảm bảo nhãn không che mất giá trị
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleAddTime}>
                                                        <IoMdAdd className="text-black" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ height: "56px", marginTop: "8px" }}
                                        onClick={handleOpenChooseMovie}
                                    >
                                        <BiSolidMoviePlay className='h-7 w-10' />
                                    </Button>
                                    <div className="flex gap-3 mt-3 flex-wrap p-2">
                                        {movieScreen.showtime.map((time, index) => (
                                            <button key={index} className="relative p-2 bg-fuchsia-600 text-white rounded-md h-10">
                                                {time}
                                                <div
                                                    className="absolute top-1 left-1 -translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white cursor-pointer"
                                                    onClick={() => handleRemoveTime(time)}
                                                >
                                                    <IoIosTrash className="text-red-500 text-sm" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <Box mt={2} display="flex" justifyContent="center">
                                        <img
                                            src={getOjectById(movies, movieScreen.id_movie)?.imgUrl ? getOjectById(movies, movieScreen.id_movie)?.imgUrl : logos}
                                            alt=""
                                            className={`w-40 object-cover rounded-lg  ${getOjectById(movies, movieScreen.id_movie)?.imgUrl ? "h-60" : "h-40"}`}
                                        />
                                    </Box>

                                </div>

                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Item className='grid grid-cols-3 gap-2 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]'>
                                {movieScreen.id_cinema ? <>
                                    {filterListById(rooms, movieScreen.id_cinema, "id_cinema").map((element, index) => (
                                        <Card
                                            key={index}
                                            onClick={() => handleSelectRoom(element.id)}
                                            sx={{
                                                background: movieScreen.id_room.includes(element.id)
                                                    ? "radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
                                                    : "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                                                transition: "background 0.3s ease",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <SeatingLayout row={element} />
                                            <CardContent>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        background: "linear-gradient(to right, #F85032 0%, #F14343 20%, #F02F2A 71%, #E73827 100%)",
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {element?.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                    <div className="col-span-3 flex justify-start mb-4">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleBack}
                                        >
                                            <ImArrowLeft />
                                        </Button>
                                    </div>
                                </> : <>
                                    {filterListById(cinemas, movieScreen.id_location, "id_location").map((element, index) => (
                                        <Card sx={{ maxWidth: 345, background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)" }} key={index} onClick={() => setMovieScreen({ ...movieScreen, id_cinema: element.id })}>
                                            <CardMedia
                                                component="img"
                                                className='h-32'
                                                image={element?.imgUrl}
                                                alt="Hình ảnh ngẫu nhiên"
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        background: "linear-gradient(to right, #F85032 0%, #F14343 20%, #F02F2A 71%, #E73827 100%)",
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {element?.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" className='whitespace-normal'>
                                                    {element?.address}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </>
                                }
                            </Item>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
            <ModalChooseMovie handleChooseMovie={handleChooseMovie} openChooseMovie={openChooseMovie} setOpenChooseMovie={setOpenChooseMovie} handleCloseChooseMovie={handleCloseChooseMovie} />
        </div>
    );
}

export default ModalMovieScreening;