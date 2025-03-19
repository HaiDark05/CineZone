import React, { useContext } from 'react';
import { useNotification } from '../../../../context/NotificationContext';
import { ContextRegions } from '../../../../context/RegionsProvider';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from '@mui/material';
import { ImFolderUpload } from 'react-icons/im';
import { uploadImageToCloudinary } from '../../../../config/cloudinaryConfig';

function ModalRegion({ open, handleClose, region, setRegion, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextRegions);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(region.imgUrl, "region");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }

            // Tạo object region mới với ảnh đã upload
            const updatedRegion = { ...region, imgUrl: imgLoading };

            // Gửi request API
            if (region.id) {
                await axios.put(`http://localhost:8080/api/regions/${region.id}`, updatedRegion);
                showNotification("Region updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/regions", updatedRegion);
                showNotification("Region added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting region:", error);
            showNotification("Error submitting region!", "error");
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegion((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setRegion({ ...region, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
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
                {region.id ? "Update Region" : "Add New Region"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Region Name"
                    name="name"
                    value={region?.name}
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
                    value={region?.description}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="dense"
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <FormControl fullWidth error={!!errors.imgUrl} margin="dense">
                    <Button variant="contained" component="label">
                        <ImFolderUpload />
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                    {errors.imgUrl && <FormHelperText>{errors.imgUrl}</FormHelperText>}
                    {region.imgUrl && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={region.imgUrl}
                                alt="Preview"
                                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
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

export default ModalRegion;