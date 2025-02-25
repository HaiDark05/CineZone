import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextCharacters } from '../../../../context/CharacterProvider';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
import axios from 'axios';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
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
function ModalCharacter({open, handleClose, character, setCharacter, validation, errors}) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextCharacters);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }
    
            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(character.imgUrl, "characters");
    
            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }
    
            // Tạo object character mới với ảnh đã upload
            const updatedCharacter = { ...character, imgUrl: imgLoading };
    
            // Gửi request API
            if (character.id) {
                await axios.put(`http://localhost:8080/api/characters/${character.id}`, updatedCharacter);
                showNotification("Character updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/characters", updatedCharacter);
                showNotification("Character added successfully!", "success");
            }
    
            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu
    
        } catch (error) {
            console.error("Error submitting character:", error);
            showNotification("Error submitting character!", "error");
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCharacter((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
               setCharacter({...character, imgUrl : reader.result})
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
                    {character.id ? "Update Character" : "Add New Character"}
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
                        label="Character Name"
                        name="name"
                        value={character?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={character?.description}
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
                            src={character.imgUrl}
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

export default ModalCharacter;