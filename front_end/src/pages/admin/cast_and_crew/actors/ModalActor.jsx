import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
  } from '@mui/material';
import { ImFolderUpload } from "react-icons/im";
import axios from 'axios';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextActors } from '../../../../context/ActorsProvider';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function ModalActor({ open, handleClose, actor, setActor, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextActors);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(actor.imgUrl, "actors");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }

            // Tạo object actor mới với ảnh đã upload
            const updatedActor = { ...actor, imgUrl: imgLoading };

            // Gửi request API
            if (actor.id) {
                await axios.put(`http://localhost:8080/api/actors/${actor.id}`, updatedActor);
                showNotification("Actor updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/actors", updatedActor);
                showNotification("Actor added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting actor:", error);
            showNotification("Error submitting actor!", "error");
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setActor((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setActor({ ...actor, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {actor.id ? "Update Actor" : "Add New Actor"}
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Actor Name"
                        name="name"
                        value={actor?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={actor?.description}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<ImFolderUpload />}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>

                    <Box mt={1} display="flex" justifyContent="center">
                        <img
                            src={actor.imgUrl}
                            alt="Preview"
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalActor;