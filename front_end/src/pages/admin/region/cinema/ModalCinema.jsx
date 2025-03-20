import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextLocations } from '../../../../context/LocationProvider';
import { ContextCinemas } from '../../../../context/CinemasProvider';
import { ContextRegions } from '../../../../context/RegionsProvider';
import axios from 'axios';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from '@mui/material';
import { ImFolderUpload } from 'react-icons/im';
import { filterListById } from '../../../../utils/FunctionConvert';

function ModalCinema({ open, handleClose, cinema, setCinema, validation, errors }) {
    const showNotification = useNotification();
    const { locations } = useContext(ContextLocations);
    const { setUpdate } = useContext(ContextCinemas);
    const { regions } = useContext(ContextRegions)
    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(cinema.imgUrl, "Cinema");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }

            // Tạo object cinema mới với ảnh đã upload
            const updatedCinema = { ...cinema, imgUrl: imgLoading };

            // Gửi request API
            if (cinema.id) {
                await axios.put(`http://localhost:8080/api/cinemas/${cinema.id}`, updatedCinema);
                showNotification("Cinema updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/cinemas", updatedCinema);
                showNotification("Cinema added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting cinema:", error);
            showNotification("Error submitting cinema!", "error");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCinema({ ...cinema, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCinema((prevData) => ({
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
                {cinema.id ? "Update Cinema" : "Add New Cinema"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Cinema Name"
                    name="name"
                    value={cinema?.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={cinema?.address}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errors.address}
                    helperText={errors.address}
                />
                <Autocomplete
                    options={regions}
                    getOptionLabel={(option) => option?.name}
                    value={regions.find((region) => region.id === cinema?.id_region)}
                    onChange={(event, newValue) => {
                        setCinema((prev) => ({
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
                <Autocomplete
                    options={filterListById(locations, cinema.id_region, "id_region")}
                    getOptionLabel={(option) => option?.name}
                    value={locations.find((location) => location.id === cinema?.id_location)}
                    onChange={(event, newValue) => {
                        setCinema((prev) => ({
                            ...prev,
                            id_location: newValue ? newValue.id : "",
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Location" variant="outlined" fullWidth margin="dense" error={!!errors.id_location}
                            helperText={errors.id_location} />
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
                    {cinema.imgUrl && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={cinema.imgUrl}
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

export default ModalCinema;