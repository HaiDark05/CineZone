import React, { useState } from 'react';
import { logos } from '../../../../utils/Containts';
import BoxSearch from '../../../../components/BoxSearch';
import TableCharacter from './TableCharacter';
import ModalCharacter from './ModalCharacter';

const inner = { name: "", description: "", imgUrl: logos }
function Characters(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchObject, setSearchObject] = useState('');
    const addItem = () => {
        handleOpen();
        setCharacter(inner);
    }
    const [character, setCharacter] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const validation = () => {
        const newErrors = {};
        newErrors.name = character.name ? "" : "Vui long nhap name";
        newErrors.description = character.description ? "" : "vui long nhap descriptions";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }
    return (
        <>
            <BoxSearch addItem={addItem} title={"Characters"} nameBtn={"Character"} setSearchObject={setSearchObject} />
            <div className="p-3 m-auto">
                <TableCharacter setCharacter={setCharacter} character={character} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject} />
            </div>
            <ModalCharacter handleClose={handleClose} open={open} character={character} errors={errors} validation={validation} setCharacter={setCharacter}/>
        </>
    );
}

export default Characters;