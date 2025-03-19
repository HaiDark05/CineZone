import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import BoxSearch from '../../../../components/BoxSearch';
import TableTypeChair from './TableTypeChair';
import ModalTypeChair from './ModalTypeChair';

const inner = { name: "", imgUrl: logos, price: "" }
function TypeChairs(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');  
    const [typeChair, setTypeChair] = useState(inner);
    const [errors, setErrors] = useState(inner);

    const addItem = () => {
        handleOpen();
        setTypeChair(inner);
        setErrors({...inner , imgUrl : ""});
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = typeChair.name ? "" : "Please enter name";
        newErrors.price = typeChair.price ? "" : "Please enter price";
        newErrors.imgUrl = (typeChair.imgUrl && typeChair.imgUrl !== logos) ? "" : "Please enter img type chair";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
           <BoxSearch addItem={addItem} title={"Type Chairs"} nameBtn={"Type Chair"} setSearchObject={setSearchObject}/>
           <div className="p-3 m-auto">
            <TableTypeChair setTypeChair={setTypeChair} typeChair={typeChair} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject}/>
           </div>
           <ModalTypeChair handleClose={handleClose} open={open} typeChair={typeChair} errors={errors} validation={validation} setTypeChair={setTypeChair}/>
        </>
    );
}

export default TypeChairs;