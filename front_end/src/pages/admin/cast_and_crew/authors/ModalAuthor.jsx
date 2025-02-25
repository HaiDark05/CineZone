import React, { useContext } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextAuthors } from '../../../../context/AuthorsProvider';

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
function ModalAuthor({open, handleClose, author, setAuthor, validation, errors}) {
    const showNotification = useNotification();
    const { update ,setUpdate } = useContext(ContextAuthors);
    const handleSubmit = async () => {
        if (!validation()) {
            return;
        }
        if(author.id) {
            await axios.put(`http://localhost:8080/api/authors/${author.id}`, author);
        }else {
            await axios.post("http://localhost:8080/api/authors", author);
            showNotification('Author added successfully!', "success");
        }   
        handleClose(); // Đóng modal sau khi submit
        setUpdate(!update);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAuthor((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                    {author.id ? "Update Author" : "Add New Author"}
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
                        label="Author Name"
                        name="name"
                        value={author?.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name} 
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={author?.description}
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

export default ModalAuthor;