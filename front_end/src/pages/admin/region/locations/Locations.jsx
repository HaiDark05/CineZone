import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import TableLocation from './TableLocation';
import ModalLocation from './ModalLocation';
import BoxSearch from '../../../../components/BoxSearch';

const inner ={name: "", description: "", id_region: ""}
function Locations(props) {
    const [open,setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [searchObject, setSearchObject] = useState('');
        const addItem = () => {
            handleOpen();
            setLocation(inner);
            setErrors(inner);
        }
        const [location, setLocation] = useState(inner);
        const [errors, setErrors] = useState(inner);
        const validation = () => {
            const newErrors = {};
            newErrors.name = location.name ? "" : "Please enter name";
            newErrors.description = location.description ? "" : "Please enter descriptions";
            newErrors.id_region = location.id_region ? "" : "Please enter region";
            setErrors(newErrors);
            return Object.values(newErrors).every(e => e == "");
        }
    return (
        <>
            <BoxSearch addItem={addItem} title={"Location"} nameBtn={"Location"} setSearchObject={setSearchObject}/>
            <div className="p-3 m-auto">
                <TableLocation setLocation={setLocation} location={location} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject} />
            </div>
            <ModalLocation handleClose={handleClose} open={open} location={location} errors={errors} validation={validation} setLocation={setLocation} />
        </>
    );
}

export default Locations;