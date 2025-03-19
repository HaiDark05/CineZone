import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import BoxSearch from '../../../../components/BoxSearch';
import ModalRegion from './ModalRegion';
import TableRegion from './TableRegion';

const inner = { name: "", description: "", imgUrl: logos }
function Regions(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [region, setRegion] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const addItem = () => {
        handleOpen();
        setRegion(inner);
        setErrors({ ...inner, imgUrl: "" });
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = region.name ? "" : "Please enter name";
        newErrors.description = region.description ? "" : "Please enter descriptions";
        newErrors.imgUrl = (region.imgUrl && region.imgUrl !== logos) ? "" : "Please enter img region";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <div>
            <BoxSearch addItem={addItem} title={"Region"} nameBtn={"Region"} setSearchObject={setSearchObject} />
            <div className="p-3 m-auto">
                <TableRegion setRegion={setRegion} region={region} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject} />
            </div>
            <ModalRegion handleClose={handleClose} open={open} region={region} errors={errors} validation={validation} setRegion={setRegion} />
        </div>
    );
}

export default Regions;