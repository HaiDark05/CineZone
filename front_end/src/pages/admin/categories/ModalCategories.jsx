import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNotification } from "../../../context/NotificationContext";
import { ContextCategories } from '../../../context/CategoryProvider';

function ModalCategories({ open, handleClose, setCategory, category, validation, errors }) {
    const showNotification = useNotification();
    const { categories, update, setUpdate } = useContext(ContextCategories);
    const handleSubmit = async () => {
        if (!validation()) {
            return;
        }
        if (category.id) {
            await axios.put(`http://localhost:8080/api/categories/${category.id}`, category);
        } else {
            await axios.post("http://localhost:8080/api/categories", category);
            showNotification('Category added successfully!', "success");
        }
        handleClose(); // Đóng modal sau khi submit
        setUpdate(!update);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{
            sx: {
                width: "30vw",
                maxWidth: "none",
                borderRadius: 2,
                p: 2,
            },
        }}>
            <DialogTitle>{category.id ? "Update Category" : "Add New Category"}</DialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Category Name"
                        name="name"
                        value={category?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={category?.description}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>


    );
}

export default ModalCategories;