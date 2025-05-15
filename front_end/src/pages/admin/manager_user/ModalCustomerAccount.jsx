import React, { useContext } from 'react';
import { useNotification } from '../../../context/NotificationContext';
import { ContextAccounts } from '../../../context/AccountsProvider';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
} from '@mui/material';
import { ROLES } from '../../../utils/Containts'
import { uploadImageToCloudinary } from '../../../config/cloudinaryConfig';
import { ImFolderUpload } from 'react-icons/im';

function ModalCustomerAccount({ open, handleClose, account, setAccount, validation, errors }) {
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextAccounts);

    const handleSubmit = async () => {
        try {
            if (!validation()) {
                return;
            }

            // Upload ảnh lên Cloudinary
            const imgLoading = await uploadImageToCloudinary(account.imgUrl, "accounts");

            if (!imgLoading) {
                showNotification("Failed to upload image!", "error");
                return;
            }
            // Dùng ảnh mặc định luôn
            const updatedAccount = { ...account, imgUrl: imgLoading };
            // Gửi request API
            if (account.id) {
                await axios.put(`http://localhost:8080/api/accounts/${account.id}`, updatedAccount);
                showNotification("Account updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/accounts", updatedAccount);
                showNotification("Account added successfully!", "success");
            }

            handleClose(); // Đóng modal
            setUpdate((prev) => !prev); // Cập nhật lại state để load lại dữ liệu

        } catch (error) {
            console.error("Error submitting account:", error);
            showNotification("Error submitting account!", "error");
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAccount({ ...account, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {account.id ? "Update Account" : "Add New Account"}
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
                        label="Account Name"
                        name="user_name"
                        value={account?.user_name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.user_name}
                        helperText={errors.user_name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={account?.email}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Password"
                                name="pass_word"
                                value={account?.pass_word}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                error={!!errors.pass_word}
                                helperText={errors.pass_word}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="role-label">Select Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role-select"
                                    value={account?.id_role || ROLES.USER}
                                    onChange={(e) =>
                                        setAccount((prev) => ({
                                            ...prev,
                                            id_role: e.target.value,
                                        }))
                                    }
                                    label="Select Role"
                                >
                                    <MenuItem value={ROLES.USER}>user</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

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
                            src={account?.imgUrl}
                            alt="Preview"
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
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

export default ModalCustomerAccount;