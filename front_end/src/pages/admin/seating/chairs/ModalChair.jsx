import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextChairs } from '../../../../context/ChairsProvider';
import { ContextTypeChairs } from '../../../../context/TypeChairsProvider';
import axios from 'axios';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function ModalChair({ open, handleClose, chair, setChair, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextChairs);
    const { typeChairs } = useContext(ContextTypeChairs);
    const handleSubmit = async () => {
        if (!validation()) {
            return;
        }
        if (chair.id) {
            await axios.put(`http://localhost:8080/api/chairs/${chair.id}`, chair);
        } else {
            await axios.post("http://localhost:8080/api/chairs", chair);
            showNotification('Chair added successfully!', "success");
        }
        handleClose(); // Đóng modal
        setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setChair((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth PaperProps={{
            sx: {
                width: "35vw",
                maxWidth: "none",
                borderRadius: 2,
                p: 2,
            },
        }}>
            <DialogTitle>{chair.id ? "Update Chair" : "Add NewChair"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="TypeChair Name"
                    name="name"
                    value={chair?.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <Autocomplete
                    options={typeChairs}
                    getOptionLabel={(option) => option?.name}
                    value={typeChairs.find((typeChair) => typeChair.id === chair?.id_typeChair)}
                    onChange={(event, newValue) => {
                        setChair((prev) => ({
                            ...prev,
                            id_typeChair: newValue ? newValue.id : "",
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select TypeChair" variant="outlined" fullWidth margin="dense" error={!!errors.id_typeChair}
                            helperText={errors.id_typeChair} />
                    )}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalChair;