import React, { useContext, useState } from 'react';
import {
    TextField,
    Card,
    CardContent,
    Avatar,
    Typography,
    Grid,
    Divider,
    Box,
    Paper,
    Button,
    IconButton,
    InputAdornment
} from '@mui/material';
import { ContextAuth } from '../../../context/AuthProvider';
import { useNotification } from '../../../context/NotificationContext';
import { ImFolderUpload } from 'react-icons/im';
import { ContextAccounts } from '../../../context/AccountsProvider';
import { avatarDefault } from '../../../utils/Containts';
import { uploadImageToCloudinary } from '../../../config/cloudinaryConfig';
import axios from 'axios';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

function ProfileAdmin() {
    const { isLogin, updateUserProfile } = useContext(ContextAuth);
    const [isEditing, setIsEditing] = useState(false);
    const showNotification = useNotification();
    const { setUpdate } = useContext(ContextAccounts);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Lưu thông tin chỉnh sửa
    const [editedAccount, setEditedAccount] = useState({
        imgUrl: isLogin?.imgUrl || '',
        user_name: isLogin?.user_name || '',
        email: isLogin?.email || '',
        pass_word: isLogin?.pass_word || '', // Password sẽ để trống mặc định
        id_role: isLogin?.id_role || 'admin'
    });

    const handleSubmit = async () => {
        try {
            // Nếu thay đổi ảnh, upload ảnh mới lên Cloudinary
            let imgLoading = editedAccount.imgUrl;

            if (editedAccount.imgUrl && editedAccount.imgUrl !== isLogin?.imgUrl) {
                imgLoading = await uploadImageToCloudinary(editedAccount.imgUrl, "admin");
                if (!imgLoading) {
                    showNotification("Failed to upload image!", "error");
                    return;
                }
            }

            // Cập nhật object user mới với ảnh đã upload
            const updatedAccount = { ...editedAccount, imgUrl: imgLoading };

            // Gửi request PUT lên server
            if (isLogin.id) {
                await axios.put(`http://localhost:8080/api/accounts/${isLogin.id}`, updatedAccount);

                // Cập nhật lại context với ảnh mới
                updateUserProfile({ imgUrl: imgLoading });

                showNotification("Profile Admin updated successfully!", "success");
            }

            setIsEditing(false);
            setUpdate((prev) => !prev); // Cập nhật state để load lại dữ liệu
        } catch (error) {
            console.error("Error submitting admin:", error);
            showNotification("Error submitting admin!", "error");
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAccount({
            ...editedAccount,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedAccount({ ...editedAccount, imgUrl: reader.result })
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="m-auto w-[80%] p-3 mt-10">
            <Paper elevation={3} className="rounded-2xl overflow-hidden">
                <Box className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 text-white">
                    <Typography variant="h4" className="font-bold">
                        Profile Admin
                    </Typography>
                    <Typography variant="subtitle1">
                        Personal Account Management and System Security
                    </Typography>
                </Box>

                <Card className="p-6">
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="flex flex-col items-center">
                                <Avatar
                                    src={editedAccount.imgUrl || avatarDefault}
                                    alt="Admin Avatar"
                                    sx={{ width: 120, height: 120, border: '3px solid #3b82f6' }}
                                />
                                <Typography className="mt-4 font-semibold text-lg text-gray-700">
                                    {editedAccount.user_name || 'Admin'}
                                </Typography>
                                <Typography className="text-sm text-gray-500">
                                    {isLogin?.id_role || 'admin'}
                                </Typography>
                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<ImFolderUpload />}
                                        sx={{ whiteSpace: 'nowrap', minWidth: 140, px: 2 }}
                                    >
                                        Upload Image
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                )}
                            </div>
                            <Divider orientation="vertical" flexItem className="hidden md:block" />

                            <Grid container spacing={3} className="w-full">
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Name"
                                        name="user_name"
                                        value={editedAccount.user_name}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ readOnly: !isEditing }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={editedAccount.email}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ readOnly: !isEditing }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Password"
                                        name="pass_word"
                                        value={editedAccount?.pass_word}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            readOnly: !isEditing,
                                            endAdornment: isEditing && (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={togglePasswordVisibility}
                                                        edge="end"
                                                        size="small"
                                                    >
                                                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <div className="mt-6 flex gap-4">
                                {isEditing ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setIsEditing(true)}
                                        sx={{ minWidth: 120, whiteSpace: 'nowrap', px: 2 }}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}

export default ProfileAdmin;
