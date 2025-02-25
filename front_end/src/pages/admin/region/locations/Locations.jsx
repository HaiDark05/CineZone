import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import TableLocation from './TableLocation';
import ModalLocation from './ModalLocation';
import BoxSearch from '../../../../components/BoxSearch';

const inner ={name: "", description: "", imgUrl : logos}
function Locations(props) {
    const [open,setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [searchObject, setSearchObject] = useState('');
        const addItem = () => {
            handleOpen();
            setLocation(inner);
        }
        const [location, setLocation] = useState(inner);
        const [errors, setErrors] = useState(inner);
        const validation = () => {
            const newErrors = {};
            newErrors.name = location.name ? "" : "Vui long nhap name";
            newErrors.description = location.description ? "" : "vui long nhap descriptions";
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