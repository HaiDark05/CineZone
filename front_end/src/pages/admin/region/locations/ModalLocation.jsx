import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextLocations } from '../../../../context/LocationProvider';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ImFolderUpload } from 'react-icons/im';

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
function ModalLocation({ open, handleClose, location, setLocation, validation, errors}) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextLocations);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }
    
            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(location.imgUrl, "location");
    
            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }
    
            // Tạo object location mới với ảnh đã upload
            const updatedLocation = { ...location, imgUrl: imgLoading };
    
            // Gửi request API
            if (location.id) {
                await axios.put(`http://localhost:8080/api/location/${location.id}`, updatedLocation);
                showNotification("Location updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/location", updatedLocation);
                showNotification("Location added successfully!", "success");
            }
    
            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu
    
        } catch (error) {
            console.error("Error submitting location:", error);
            showNotification("Error submitting location!", "error");
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocation((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
               setLocation({...location, imgUrl : reader.result})
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {location.id ? "Update Location" : "Add New Location"}
                </Typography>
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
                        label="Location Name"
                        name="name"
                        value={location?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={location?.description}
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
                    >
                        <ImFolderUpload />
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Box mt={2} display="flex" justifyContent="center">
                        <img
                            src={location.imgUrl}
                            alt="Preview"
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalLocation;