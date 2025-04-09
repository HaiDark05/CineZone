import React, { useContext, useEffect, useState } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextRooms } from '../../../../context/RoomsProvider';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, styled, TextField } from '@mui/material';
import axios from 'axios';
import { FaTableCells } from "react-icons/fa6";
import { chairDefault, chairSelect } from '../../../../utils/Containts';
import ModalChooseChair from './ModalChooseChair';
import { ContextTypeChairs } from '../../../../context/TypeChairsProvider';
import { getOjectById, filterListById } from '../../../../utils/FunctionConvert';
import { ContextRegions } from '../../../../context/RegionsProvider';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
function ModalRoom({ open, handleClose, room, setRoom, validation, errors, generateGrid, grid, selectedCells, setSelectedCells }) {
    const { setUpdate } = useContext(ContextRooms);
    const { regions } = useContext(ContextRegions);
    const { locations } = useContext(ContextLocations);
    const { cinemas } = useContext(ContextCinemas)
    const showNotification = useNotification();
    const [chairChoose, setChairChoose] = useState({});
    const { typeChairs } = useContext(ContextTypeChairs);
    const [chooseChair, setChooseChair] = useState(false);
    const handleOpenChoose = () => setChooseChair(true);
    const handleCloseChoose = () => setChooseChair(false);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }
            room.list_chair = selectedCells ;
            // Gửi request API
            if (room.id) {
                await axios.put(`http://localhost:8080/api/rooms/${room.id}`, room);
                showNotification("Room updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/rooms", room);
                showNotification("Room added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev);

        } catch (error) {
            console.error("Error submitting Room:", error);
            showNotification("Error submitting Room!", "error");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRoom((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleCellClick = (row, col) => {
        setSelectedCells(prevSelectedCells => {
            // Kiểm tra xem phần tử đã tồn tại chưa
            const isExist = prevSelectedCells.some(cell => cell.row === row && cell.col === col);
            if (isExist) {
                return prevSelectedCells; // Nếu đã tồn tại, không thêm mới
            }
            return [...prevSelectedCells, { row, col }];
        });
        const result = selectedCells.find(e => e.row == row && e.col == col);
        if (result) {
            setChairChoose(result);
        } else {
            setChairChoose({ row, col })
        }
        handleOpenChoose();
    };
    const chooseTypeChair = (type) => {
        setSelectedCells(prevSelectedCells => {
            return prevSelectedCells.map((cell, index) =>
                cell.row == chairChoose.row && cell.col == chairChoose.col
                    ? { ...cell, id_type_chair: type }
                    : cell
            );
        });
        setChairChoose({ ...chairChoose, id_type_chair: type });
    };

    const showImgChair = (row, col) => {
        const result = selectedCells.find(e => e.row == row & e.col == col);

        return result?.id_type_chair ? getOjectById(typeChairs, result?.id_type_chair)?.imgUrl : chairDefault;
    }


    return (
        <div className="">
            <Dialog open={open} onClose={handleClose} fullWidth PaperProps={{
                sx: {
                    width: "80vw",
                    maxWidth: "none",
                    borderRadius: 2,
                    p: 2,
                },
            }}>
                <DialogTitle>{room.id ? "Update Room" : "Add Room"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Item>
                                <Autocomplete
                                    options={regions}
                                    getOptionLabel={(option) => option?.name}
                                    value={regions.find((region) => region.id === room?.id_region)}
                                    onChange={(event, newValue) => {
                                        setRoom((prev) => ({
                                            ...prev,
                                            id_region: newValue ? newValue.id : "",
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Region" variant="outlined" fullWidth margin="dense" error={!!errors.id_region}
                                            helperText={errors.id_region} />
                                    )}

                                />
                                <Autocomplete
                                    options={filterListById(locations, room.id_region, "id_region")}
                                    getOptionLabel={(option) => option?.name}
                                    value={locations.find((location) => location.id === room?.id_location)}
                                    onChange={(event, newValue) => {
                                        setRoom((prev) => ({
                                            ...prev,
                                            id_location: newValue ? newValue.id : "",
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Location" variant="outlined" fullWidth margin="dense" error={!!errors.id_location}
                                            helperText={errors.id_location} />
                                    )}

                                />
                                <Autocomplete
                                    options={filterListById(cinemas, room.id_location, "id_location")}
                                    getOptionLabel={(option) => option?.name}
                                    value={cinemas.find((cinema) => cinema.id === room?.id_cinema)}
                                    onChange={(event, newValue) => {
                                        setRoom((prev) => ({
                                            ...prev,
                                            id_cinema: newValue ? newValue.id : "",
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Cinema" variant="outlined" fullWidth margin="dense" error={!!errors.id_cinema}
                                            helperText={errors.id_cinema} />
                                    )}

                                />
                                <TextField
                                    label="Room"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name='name'
                                    value={room?.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                                <Box display="flex" gap={2} alignItems="center">
                                    <TextField
                                        label="Rows"
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        name='rows'
                                        value={room?.rows}
                                        type="number"
                                        onChange={handleChange}
                                        inputProps={{ min: 0 }}
                                    />
                                    <TextField
                                        label="Cols"
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        name='cols'
                                       value={room.cols}
                                        type="number"
                                        onChange={handleChange}
                                        inputProps={{ min: 0 }}
                                    />
                                    <Button onClick={()=> generateGrid(room)} color="primary" variant="contained"><FaTableCells className='text-[16px]' /></Button>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Item sx={{ display: "flex" }}>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${room.cols},1fr)`,
                                    gap: '10px'
                                }}>
                                    {room.cols &&
                                        grid.flat().map((element, index) => {
                                            const rowIndex = Math.floor(index / room.cols);
                                            const colIndex = index % room.cols;
                                            const key = `${rowIndex}-${colIndex}`;

                                            return (
                                                <div key={key} className="relative">
                                                    <img
                                                        className="w-10 h-10 cursor-pointer"
                                                        src={showImgChair(rowIndex, colIndex)}
                                                        alt={`Chair ${key}`}
                                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
            <ModalChooseChair chairChoose={chairChoose} chooseTypeChair={chooseTypeChair} handleCloseChoose={handleCloseChoose} chooseChair={chooseChair} />
        </div>
    );
}

export default ModalRoom;