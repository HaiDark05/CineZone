import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import BoxSearch from '../../../../components/BoxSearch';
import ModalCinema from './ModalCinema';
import TableCinema from './TableCinema';

const inner = { name: "", imgUrl: logos, address: "", id_location: "", id_region: "" }
function Cinema(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const [cinema, setCinema] = useState(inner);
    const [errors, setErrors] = useState(inner);
    
    const addItem = () => {
        handleOpen();
        setCinema(inner);
        setErrors({...inner , imgUrl : ""});
    }
    const validation = () => {
        const newErrors = {};
        newErrors.name = cinema.name ? "" : "Please enter name";
        newErrors.address = cinema.address ? "" : "Please enter Address";
        newErrors.id_location = cinema.id_location ? "" : "Please choose locations";
        newErrors.id_region = cinema.id_region ? "" : "Please choose regions";
        newErrors.imgUrl = (cinema.imgUrl && cinema.imgUrl !== logos) ? "" : "Please enter img type chair";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
            <BoxSearch addItem={addItem} title={"Cinema"} nameBtn={"Cinema"} setSearchObject={setSearchObject}/>
            <div className="p-3 m-auto">
                <TableCinema searchObject={searchObject} setSearchObject={setSearchObject} setOpen={setOpen} setCinema={setCinema} cinema={cinema}/>
            </div>
            <ModalCinema handleClose={handleClose} open={open} cinema={cinema} errors={errors} validation={validation} setCinema={setCinema}/>
        </>
    );
}

export default Cinema;