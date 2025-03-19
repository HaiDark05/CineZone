import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import BoxSearch from '../../../../components/BoxSearch';
import ModalFood from './ModalFood';
import TableFood from './TableFood';

const inner = { name: "", imgUrl: logos, price: "", discount: "", id_cinema: "" }
function Food(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [food, setFood] = useState(inner);
    const [errors, setErrors] = useState(inner);

    const addItem = () => {
        handleOpen();
        setFood(inner);
        setErrors({ ...inner, imgUrl: "" });
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = food.name ? "" : "Please enter name";
        newErrors.price = food.price ? "" : "Please enter price";
        newErrors.discount = food.discount ? "" : "Please enter discount";
        newErrors.id_cinema = food.id_cinema ? "" : "Please enter cinema";
        newErrors.imgUrl = (food.imgUrl && food.imgUrl !== logos) ? "" : "Please enter img type chair";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
           <BoxSearch addItem={addItem} title={"Food"} nameBtn={"Food"} setSearchObject={setSearchObject}/>
           <div className="p-3 m-auto">
                <TableFood setFood={setFood} food={food} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject}/>
           </div>
           <ModalFood handleClose={handleClose} open={open} food={food} errors={errors} validation={validation} setFood={setFood}/>
        </>
    );
}

export default Food;