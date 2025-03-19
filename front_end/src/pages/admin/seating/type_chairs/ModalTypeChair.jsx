import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextTypeChairs } from '../../../../context/TypeChairsProvider';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
import axios from 'axios';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button, Box, FormControl, FormHelperText
} from '@mui/material';
import { ImFolderUpload } from "react-icons/im";

function ModalTypeChair({ open, handleClose, typeChair, setTypeChair, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextTypeChairs);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(typeChair.imgUrl, "TypeChairs");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }

            // Tạo object actor mới với ảnh đã upload
            const updatedTypeChair = { ...typeChair, imgUrl: imgLoading };

            // Gửi request API
            if (typeChair.id) {
                await axios.put(`http://localhost:8080/api/typechairs/${typeChair.id}`, updatedTypeChair);
                showNotification("TypeChair updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/typechairs", updatedTypeChair);
                showNotification("TypeChair added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting typechair:", error);
            showNotification("Error submitting typechair!", "error");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTypeChair({ ...typeChair, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTypeChair((prevData) => ({
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
                {typeChair.id ? "Update TypeChair" : "Add New TypeChair"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="TypeChair Name"
                    name="name"
                    value={typeChair?.name}
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
                    value={typeChair?.price}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.price}
                    helperText={errors.price}
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
                    {typeChair.imgUrl && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={typeChair.imgUrl}
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

export default ModalTypeChair;
