import React, { useState } from 'react';
import TableMovieScreening from './TableMovieScreening';
import BoxSearch from '../../../../components/BoxSearch';
import ModalMovieScreening from './ModalMovieScreening';
import { logos } from '../../../../utils/Containts';
import ModalChooseMovie from './ModalChooseMovie';

const inner = { release_date: "", showtime: [], ratio: "", id_room: [], id_movie:"", id_region: "", id_location: "", id_cinema: "" }
function MovieScreening(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [movieScreen, setMovieScreen] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const addItem = () => {
        handleOpen();
        setMovieScreen(inner);
        setErrors(inner);
    }
    const validation = () => {
        const newErrors = {};
        newErrors.id_movie = movieScreen.id_movie ? "" : "Please choose movie";
        newErrors.id_room = movieScreen.id_room ? "" : "Please choose room";
        newErrors.release_date = movieScreen.release_date ? "" : "Please enter release date";
        newErrors.ratio = movieScreen.ratio ? "" : "Please enter ratio";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
            <BoxSearch addItem={addItem} title={"MovieScreen"} nameBtn={"MovieScreen"} setSearchObject={setSearchObject} />
            <div className="p-3 m-auto">
                <TableMovieScreening setOpen={setOpen} movieScreen={movieScreen} setMovieScreen={setMovieScreen} searchObject={searchObject}/>
            </div>
            <ModalMovieScreening handleClose={handleClose} open={open} movieScreen={movieScreen} errors={errors} validation={validation} setMovieScreen={setMovieScreen}/>
            <ModalChooseMovie/>
        </>
    );
}

export default MovieScreening;