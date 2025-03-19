import React, { useContext, useState } from 'react';
import BoxSearch from '../../../../components/BoxSearch';
import ModalRoom from './ModalRoom';
import ModalChooseChair from './ModalChooseChair';
import { ContextTypeChairs } from '../../../../context/TypeChairsProvider';
import TableRoom from './TableRoom';

const inner = { name: "", rows: 0, cols: 0, list_chair: [], id_cinema: "", id_location: "", id_region: "" }

function Rooms(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [room, setRoom] = useState(inner);
    const [errors, setErrors] = useState(inner);
    
    const addItem = () => {
        handleOpen();
        setRoom(inner);
        setErrors(inner);
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = room.name ? "" : "Please enter name";
        newErrors.id_region = room.id_region ? "" : "Please enter region";
        newErrors.id_location = room.id_location ? "" : "Please enter location";
        newErrors.id_cinema = room.id_cinema ? "" : "Please choose cinema";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }

    return (
        <>
            <BoxSearch addItem={addItem} title={"Rooms"} nameBtn={"Room"} setSearchObject={setSearchObject} />
            <div className="p-3 m-auto">
                <TableRoom searchObject={searchObject} setSearchObject={setSearchObject} setOpen={setOpen} setRoom={setRoom} room={room}/>
            </div>
            <ModalRoom handleClose={handleClose} open={open} room={room} errors={errors} validation={validation} setRoom={setRoom} />
            <ModalChooseChair />
        </>
    );
}

export default Rooms;