import React, { useState } from 'react';
import BoxSearch from '../../../../components/BoxSearch';
import TableChair from './TableChair';
import ModalChair from './ModalChair';

const inner = { name: "", id_typeChair: "" }
function Chairs(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [chair, setChair] = useState(inner);
    const [errors, setErrors] = useState(inner);
    
    const addItem = () => {
        handleOpen();
        setChair(inner);
        setErrors(inner);
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = chair.name ? "" : "Please enter name";
        newErrors.id_typeChair = chair.id_typeChair ? "" : "Please choose type chair";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
            <BoxSearch addItem={addItem} title={"Chairs"} nameBtn={"Chair"} setSearchObject={setSearchObject}/>
            <div className="">
                <TableChair searchObject={searchObject} setSearchObject={setSearchObject} setOpen={setOpen} setChair={setChair} chair={chair}/>
            </div>
            <ModalChair handleClose={handleClose} open={open} chair={chair} errors={errors} validation={validation} setChair={setChair}/>
        </>
    );
}

export default Chairs;