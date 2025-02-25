import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Grid,
    Autocomplete
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BiSolidCategory } from "react-icons/bi";
import React, { useContext, useState } from 'react';
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

function ModalMovie({ open, handleClose, handleModalChoose, setMovie, movie }) {
    const { authors } = useContext(ContextAuthors);
    const { categories } = useContext(ContextCategories);
    const { actors } = useContext(ContextActors);
    const { characters } = useContext(ContextCharacters);
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
                <DialogTitle>Add Movie</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Item>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="name"
                                    value={movie.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Url trailer"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="urlTrailer"
                                    value={movie.urlTrailer}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Duration"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="duration"
                                    value={movie?.duration}
                                    onChange={handleChange}
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
                                        <TextField {...params} label="Select Author" variant="outlined" fullWidth margin="dense" />
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
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Item>
                                <h1 className="flex items-center gap-1 text-indigo-600 cursor-pointer">Categories <BiSolidCategory onClick={() => handleModalChoose("categories")} /></h1>
                                <div className="flex gap-3 mt-3 flex-wrap">
                                    {movie.listCate.map((element, index) => (
                                        <button key={index} className="relative p-2 bg-fuchsia-600 text-white rounded-md">
                                            {getOjectById(categories,element)?.name}
                                            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white">
                                                <IoIosTrash className="text-red-500 text-sm" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <h1 className="flex items-center gap-1 mt-3 text-indigo-600 cursor-pointer">Actors <FaUserSecret onClick={() => handleModalChoose("actors")} /></h1>
                                <div className="flex gap-3 mt-3 flex-wrap">
                                    {movie.listActor.map((element, index) => (
                                        <div className="relative" key={index}>
                                            <img className="h-16 w-16 rounded-full" src={getOjectById(actors,element)?.imgUrl} alt="" />
                                            <div className="absolute top-0 left-0 translate-x-0 translate-y-0 w-6 h-6 flex items-center justify-center rounded-full bg-white">
                                                <IoIosTrash className="text-red-500 text-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <h1 className="flex items-center gap-1 mt-3 text-indigo-600 cursor-pointer">Characters <FaUserAstronaut onClick={() => handleModalChoose("characters")} /></h1>
                                <div className="flex gap-3 mt-3 flex-wrap">
                                    {movie.listCharacter.map((element, index) => (
                                        <div className="relative" key={index}>
                                            <img className="h-16 w-16 rounded-full" src={getOjectById(characters,element)?.imgUrl} alt="" />
                                            <div className="absolute top-0 left-0 translate-x-0 translate-y-0 w-6 h-6 flex items-center justify-center rounded-full bg-white">
                                                <IoIosTrash className="text-red-500 text-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <FaImages className="text-indigo-600 text-[20px] mt-3 cursor-pointer" />
                                <div className="flex justify-center my-2">
                                    <img src={logos} alt="" className="w-20 h-20" />
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalMovie;