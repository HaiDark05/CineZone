import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextRegions } from '../../../../context/RegionsProvider';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ImFolderUpload } from 'react-icons/im';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ModalLocation({ open, handleClose, location, setLocation, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextLocations);
    const { regions } = useContext(ContextRegions);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Gửi request API
            if (location.id) {
                await axios.put(`http://localhost:8080/api/location/${location.id}`, location);
                showNotification("Location updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/location", location);
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
                {location.id ? "Update Location" : "Add New Location"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Location Name"
                    name="name"
                    value={location?.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
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
                    margin="dense"
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <Autocomplete
                    options={regions}
                    getOptionLabel={(option) => option?.name}
                    value={regions.find((region) => region.id === location?.id_region)}
                    onChange={(event, newValue) => {
                        setLocation((prev) => ({
                            ...prev,
                            id_region: newValue ? newValue.id : "",
                        }));
                    }}
                    rror={!!errors.id_region}
                    helperText={errors.id_region}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Regions" variant="outlined" fullWidth margin="dense" error={!!errors.id_region}
                            helperText={errors.id_region} />
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

export default ModalLocation;