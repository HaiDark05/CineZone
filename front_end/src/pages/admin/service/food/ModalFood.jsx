import React, { useContext } from 'react';
import { ContextFood } from '../../../../context/FoodProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { useNotification } from '../../../../context/NotificationContext';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from '@mui/material';
import { ImFolderUpload } from 'react-icons/im';
function ModalFood({ open, handleClose, food, setFood, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextFood);
    const {cinemas} = useContext(ContextCinemas)

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(food.imgUrl, "Food");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }

            // Tạo object food mới với ảnh đã upload
            const updatedFood = { ...food, imgUrl: imgLoading };

            // Gửi request API
            if (food.id) {
                await axios.put(`http://localhost:8080/api/food/${food.id}`, updatedFood);
                showNotification("Food updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/food", updatedFood);
                showNotification("Food added successfully!", "success");
            }

            handleClose();
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting food:", error);
            showNotification("Error submitting food!", "error");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFood({ ...food, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFood((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    return (
        <Dialog open={open} onClose={handleClose} fullWidth PaperProps={{
            sx: {
                width: "35vw",
                maxWidth: "none",
                borderRadius: 2,
                p: 2,
            },
        }}>
            <DialogTitle>
                {food.id ? "Update Food" : "Add New Food"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Food Name"
                    name="name"
                    value={food?.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Price"
                    name="price"
                    value={food?.price}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <TextField
                    label="Discount"
                    name="discount"
                    value={food?.discount}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.discount}
                    helperText={errors.discount}
                />
                <Autocomplete
                    options={cinemas}
                    getOptionLabel={(option) => option?.name}
                    value={cinemas.find((cinema) => cinema.id === food?.id_cinema)}
                    onChange={(event, newValue) => {
                        setFood((prev) => ({
                            ...prev,
                            id_cinema: newValue ? newValue.id : "",
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Cinema" variant="outlined" fullWidth margin="dense" error={!!errors.id_cinema}
                            helperText={errors.id_cinema} />
                    )}

                />
                <FormControl fullWidth error={!!errors.imgUrl} margin="dense">
                    <Button variant="contained" component="label">
                        <ImFolderUpload />
                        <input
                            type="file"
                            hidden accept="image/*"
                            onChange={handleFileChange}

                        />
                    </Button>
                    {errors.imgUrl && <FormHelperText>{errors.imgUrl}</FormHelperText>}
                    {food.imgUrl && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={food.imgUrl}
                                alt="Preview"
                                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                            />
                        </Box>
                    )}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalFood;