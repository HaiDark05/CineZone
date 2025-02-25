import React, { useState } from 'react';
import BoxSearch from '../../../../components/BoxSearch';
import TableActor from './TableActor';
import ModalActor from './ModalActor';
import { logos } from '../../../../utils/Containts';

const inner = { name: "", description: "", imgUrl : logos }
function Actors(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const addItem = () => {
        handleOpen();
        setActor(inner);
    }
    const [actor, setActor] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const validation = () => {
        const newErrors = {};
        newErrors.name = actor.name ? "" : "Vui long nhap name";
        newErrors.description = actor.description ? "" : "vui long nhap descriptions";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
            <BoxSearch addItem={addItem} title={"Actors"} nameBtn={"Actor"} setSearchObject={setSearchObject}/>
            <div className="p-3 m-auto">
                <TableActor setActor={setActor} actor={actor} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject} />
            </div>
            <ModalActor handleClose={handleClose} open={open} actor={actor} errors={errors} validation={validation} setActor={setActor} />
        </>
    );
}

export default Actors;