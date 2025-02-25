import React, { useContext, useState } from 'react';
import ModalMovie from './ModalMovie';
import BoxSearch from '../../../../components/BoxSearch';
import ModalChoose from './ModalChoose';
import { ContextCategories } from '../../../../context/CategoryProvider';
import { ContextActors } from '../../../../context/ActorsProvider';
import { ContextCharacters } from '../../../../context/CharacterProvider';

const inner = { name: "", id_author: "", imgUrl: "", listCate: [], listActor: [], listCharacter: [], description: "", creatAt: new Date, likeCount: 0, duration: "", urlTrailer: "" }
function Movie(props) {
    const [movie, setMovie] = useState(inner);
    const { categories } = useContext(ContextCategories);
    const { actors } = useContext(ContextActors);
    const { characters } = useContext(ContextCharacters);
    const [dataChoose, setDatachoose] = useState([]);
    const [typeChoose, setTypeChoose] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [choose, setChoose] = useState(false);
    const handleOpened = () => setChoose(true);
    const handleClosed = () => setChoose(false);

    const addItem = () => {
        handleOpen();
    }

    console.log(movie);
    
    const handleModalChoose = (value) => {
        setChoose(true);
        setTypeChoose(value);
        switch (value) {
            case "categories":
                setDatachoose(categories);
                break;
            case "actors":
                setDatachoose(actors);
                break;
            case "characters":
                setDatachoose(characters);
                break;
            default:
                break;
        }
    }

    const handleSelect = (item, type) => {
        setMovie(prevData => {
            let updatedList;
            switch (type) {
                case "categories":
                    updatedList = toggleSelection(prevData.listCate, item);
                    return { ...prevData, listCate: updatedList };
                case "actors":
                    updatedList = toggleSelection(prevData.listActor, item);
                    return { ...prevData, listActor: updatedList };
                case "characters":
                    updatedList = toggleSelection(prevData.listCharacter, item);
                    return { ...prevData, listCharacter: updatedList };
                default:
                    return prevData;
            }
        });
    };

    const toggleSelection = (list, item) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    const getSelectedItems = () => {
        switch (typeChoose) {
            case "categories":
                return movie.listCate;
            case "actors":
                return movie.listActor;
            case "characters":
                return movie.listCharacter;
            default:
                return [];
        }
    };

    return (
        <>
            <BoxSearch addItem={addItem} title={"Movies"} nameBtn={"Movie"} />
            <ModalMovie open={open} handleClose={handleClose} handleOpened={handleOpened} handleModalChoose={handleModalChoose} setMovie={setMovie} movie={movie}/>
            <ModalChoose getSelectedItems={getSelectedItems()} handleSelect={handleSelect} choose={choose} handleClosed={handleClosed} dataChoose={dataChoose} typeChoose={typeChoose} />
        </>
    );
}

export default Movie;