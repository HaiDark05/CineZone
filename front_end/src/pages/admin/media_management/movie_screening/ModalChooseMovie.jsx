import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ContextMovies } from '../../../../context/MovieProvider';
import { IoSearch } from 'react-icons/io5';

function ModalChooseMovie({openChooseMovie, handleCloseChooseMovie, movieChoose, setSelectedMovie}) {
    const { movies } = useContext(ContextMovies);
    const [searchObject, setSearchObject] = useState('');

    const handleChooseMovie = (movie) => {
        setSelectedMovie(movie);
        handleCloseChooseMovie();
    };    
    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchObject.toLowerCase())
    );
    return (
        <div>
            <Dialog open={openChooseMovie} onClose={handleCloseChooseMovie} PaperProps={{
                sx: {
                    width: "70vw", 
                    maxWidth: "none", 
                    borderRadius: 2, 
                    p: 2, 
                },
            }}>
                <DialogTitle>
                    <div className="flex items-center justify-between gap-2">
                        <span>Choose Movie</span>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Enter keywords..."
                            value={searchObject}
                            onChange={(e) => setSearchObject(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IoSearch />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='grid grid-cols-3 gap-2'>
                         {filteredMovies?.map((e,index) => (
                        <div key={index} onClick={() => handleChooseMovie(e)} className="cursor-pointer">
                            <div>
                                <img src={e.imgUrl} alt="" className='w-40 h-60 m-auto rounded-lg' />
                            </div>
                            <p className='mt-2 text-black whitespace-normal text-center'>{e.name}</p>
                        </div>
                    ))}
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseChooseMovie} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalChooseMovie;