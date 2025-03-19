import React, { useState } from 'react';
import BoxSearch from '../../../../components/BoxSearch';
import TableAuthor from './TableAuthor';
import ModalAuthor from './ModalAuthor';

const inner = { name: "", description: "" }
function Authors(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [author, setAuthor] = useState(inner);
    const [errors, setErrors] = useState(inner);
    
    const addItem = () => {
        handleOpen();
        setAuthor(inner);
        setErrors(inner);
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = author.name ? "" : "Vui long nhap name";
        newErrors.description = author.description ? "" : "vui long nhap descriptions";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <div>
            <BoxSearch addItem={addItem} title={"Authors"} nameBtn={"Author"} setSearchObject={setSearchObject}/>
            <div className="p-3 m-auto">
                <TableAuthor setAuthor={setAuthor} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject}/>
            </div>
            <ModalAuthor handleClose={handleClose} open={open} author={author} errors={errors} validation={validation} setAuthor={setAuthor}/>
        </div>
    );
}

export default Authors;