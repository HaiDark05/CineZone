import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Grid,
    Autocomplete,
    Box
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BiSolidCategory } from "react-icons/bi";
import React, { useContext, useRef, useState } from 'react';
import { IoIosTrash } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import { logos } from "../../../../utils/Containts";
import { ContextAuthors } from "../../../../context/AuthorsProvider";
import { ContextCategories } from "../../../../context/CategoryProvider";
import { ContextActors } from "../../../../context/ActorsProvider";
import { ContextCharacters } from "../../../../context/CharacterProvider";
import { getOjectById } from "../../../../utils/FunctionConvert";
import { ImFolderUpload } from "react-icons/im";
import { useNotification } from "../../../../context/NotificationContext";
import { ContextMovies } from "../../../../context/MovieProvider";
import { uploadImageToCloudinary } from "../../../../config/cloudinaryConfig";
import axios from "axios";

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

function ModalMovie({ open, handleClose, handleModalChoose, setMovie, movie, validation, errors, handleSelect }) {
    const { authors } = useContext(ContextAuthors);
    const { categories } = useContext(ContextCategories);
    const { actors } = useContext(ContextActors);
    const { characters } = useContext(ContextCharacters);
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextMovies);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(movie.imgUrl, "movies");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }

            // Tạo object actor mới với ảnh đã upload
            const updatedMovie = { ...movie, imgUrl: imgLoading };

            // Gửi request API
            if (movie.id) {
                await axios.put(`http://localhost:8080/api/movies/${movie.id}`, updatedMovie);
                showNotification("Movie updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/movies", updatedMovie);
                showNotification("Movie added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting movie:", error);
            showNotification("Error submitting movie!", "error");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMovie({ ...movie, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovie((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div className="">
            <Dialog open={open} onClose={handleClose} PaperProps={{
                sx: {
                    width: "80vw",
                    maxWidth: "none",
                    borderRadius: 2,
                    p: 2,
                },
            }}>
                <DialogTitle>{movie.id ? "Update movie" : "Add movie"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Item>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={movie?.name}
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Url trailer"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="urlTrailer"
                                    value={movie.urlTrailer}
                                    error={!!errors.urlTrailer}
                                    helperText={errors.urlTrailer}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Duration (minutes)"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="duration"
                                    type="number"
                                    value={movie?.duration}
                                    onChange={handleChange} // Gọi hàm riêng
                                    inputProps={{ min: 0 }}
                                    error={!!errors.duration}
                                    helperText={errors.duration}
                                />

                                <Autocomplete
                                    options={authors}
                                    getOptionLabel={(option) => option?.name}
                                    value={authors.find((author) => author.id === movie?.id_author)}
                                    onChange={(event, newValue) => {
                                        setMovie((prev) => ({
                                            ...prev,
                                            id_author: newValue ? newValue.id : "",
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Author" variant="outlined" fullWidth margin="dense" error={!!errors.id_author}
                                            helperText={errors.id_author} />
                                    )}

                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="description"
                                    value={movie?.description}
                                    onChange={handleChange}
                                    rows={3}
                                    multiline
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Item>
                                <h1 className="flex items-center gap-1 text-indigo-600 cursor-pointer">Categories 
                                    <BiSolidCategory onClick={() => handleModalChoose("categories")} />
                                    {errors.cate  && <p className="text-red-600">{errors.cate}</p> }
                                </h1>
                                <div className="flex gap-3 mt-3 flex-wrap">
                                    {movie.listCate.map((element, index) => (
                                        <button key={index} className="relative p-2 bg-fuchsia-600 text-white rounded-md">
                                            {getOjectById(categories, element)?.name}
                                            <div className="absolute top-1 left-1 -translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white">
                                                <IoIosTrash onClick={() => handleSelect(element, "categories")} className="text-red-500 text-sm"/>                     
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <h1 className="flex items-center gap-1 mt-3 text-indigo-600 cursor-pointer">Actors <FaUserSecret onClick={() => handleModalChoose("actors")} /></h1>
                                <div className="flex gap-3 mt-3 flex-wrap">
                                    {movie.listActor.map((element, index) => (
                                        <div className="relative" key={index}>
                                            <img className="h-16 w-16 rounded-full" src={getOjectById(actors, element)?.imgUrl} alt="" />
                                            <div className="absolute top-1 left-1 translate-x-0 translate-y-0 w-5 h-5 flex items-center justify-center rounded-full bg-white">
                                                <IoIosTrash onClick={() => handleSelect(element, "actors")} className="text-red-500 text-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <h1 className="flex items-center gap-1 mt-3 text-indigo-600 cursor-pointer">Characters <FaUserAstronaut onClick={() => handleModalChoose("characters")} /></h1>
                                <div className="flex gap-3 mt-3 flex-wrap">
                                    {movie.listCharacter.map((element, index) => (
                                        <div className="relative" key={index}>
                                            <img className="h-16 w-16 rounded-full" src={getOjectById(characters, element)?.imgUrl} alt="" />
                                            <div className="absolute top-1 left-1 translate-x-0 translate-y-0 w-5 h-5 flex items-center justify-center rounded-full bg-white">
                                                <IoIosTrash onClick={() => handleSelect(element, "characters")} className="text-red-500 text-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col">
                                    <label className="cursor-pointer">
                                        <FaImages className="text-indigo-600 text-[20px] mt-3" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>

                                    <div className="flex justify-center my-2">
                                        <Box mt={2} display="flex" justifyContent="center">
                                            <img
                                                src={movie.imgUrl ? movie.imgUrl : logos}
                                                alt="Preview"
                                                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                                            />
                                        </Box>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalMovie;