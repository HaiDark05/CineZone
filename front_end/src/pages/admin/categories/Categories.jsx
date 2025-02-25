
import React, { use, useState } from 'react';
import TableCategories from './TableCategories';
import ModalCategories from './ModalCategories';
import BoxSearch from '../../../components/BoxSearch';

const inner = { name: "", description: "" }
function Categories(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const addItem = () => {
        handleOpen();
        setCategory(inner);
    }
    const [category ,setCategory] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const validation = () => {
        const newErrors = {};
        newErrors.name = category.name ? "" : "Vui long nhap name";
        newErrors.description = category.description ? "" : "vui long nhap descriptions";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>  
            <BoxSearch addItem={addItem} setSearchObject={setSearchObject}  title={"Categories"} nameBtn={"Category"} />
            <div className="p-3 m-auto">
                <TableCategories searchObject={searchObject} setSearchObject={setSearchObject} setOpen={setOpen} setCategory={setCategory} />
            </div>
            <ModalCategories category={category} errors={errors} validation={validation} setCategory={setCategory}  handleClose={handleClose} open={open} />
        </>
    );
}

export default Categories;