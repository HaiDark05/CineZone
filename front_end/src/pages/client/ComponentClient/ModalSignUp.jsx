import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Typography,
    InputAdornment,
} from "@mui/material";
import { IoMdLock } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { MdVisibility, MdVisibilityOff, MdClose } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import axios from 'axios';
import { ContextAuth } from '../../../context/AuthProvider';
import { avatarDefault, ROLES } from '../../../utils/Containts';
import { useNotification } from '../../../context/NotificationContext';
import { ContextAccounts } from '../../../context/AccountsProvider';


const inner = { id_role: ROLES.USER, imgUrl: avatarDefault, user_name: "", email: "", pass_word: "", re_pass_word: "" }
function ModalSignUp({ openSignUp, handleCloseSignUp, handleOpen }) {
    const [showPassword, setShowPassword] = useState(false);
    const showNotification = useNotification();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [account, setAccount] = useState(inner);
    const [errors, setErrors] = useState(inner);
    const { saveLocal } = useContext(ContextAuth);
    const { update, setUpdate } = useContext(ContextAccounts);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const validation = () => {
        const newErrors = {};
        newErrors.user_name = account.user_name ? "" : "Please enter username";
        newErrors.email = account.email ? "" : "Please enter email";
        newErrors.pass_word = account.pass_word ? "" : "Please enter password";
        newErrors.re_pass_word = account.re_pass_word ? "" : "Please confirm your password";
        if (account.pass_word !== account.re_pass_word) {
            newErrors.re_pass_word = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e === "");
    }

    const handleSubmit = async () => {
    if (!validation()) {
            return;
        }
    const { re_pass_word, ...newAccount } = account;
    try {
        const accountLogin = await axios.post("http://localhost:8080/api/accounts", newAccount);
        saveLocal("isLogin", accountLogin.data.account);
        setUpdate(!update);
        showNotification("Completed Sign Up", "success");
        handleCloseSignUp();
    } catch (error) {
        showNotification("Sign Up failed", "error");
    }
}
    return (
        <div>
            <Dialog
                open={openSignUp}
                onClose={handleCloseSignUp}
                maxWidth="xs"
                fullWidth
                className="transition-opacity duration-300 ease-in-out"
            >
                <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={handleCloseSignUp}
                >
                    <MdClose className="text-[20px]" />
                </IconButton>
                <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                    Create Account 🚀
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        name='user_name'
                        placeholder="Enter your username"
                        onChange={handleChange}
                        margin="dense"
                        value={account.user_name}
                          error={!!errors.user_name}
                        helperText={errors.user_name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoIosPerson className="text-gray-500 text-[20px]" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        placeholder="Enter your email"
                        name='email'
                        onChange={handleChange}
                        margin="dense"
                        value={account.email}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoIosMail className="text-gray-500 text-[20px]" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        placeholder="Create a password"
                        name='pass_word'
                        margin="dense"
                        onChange={handleChange}
                        value={account.pass_word}
                         error={!!errors.pass_word}
                        helperText={errors.pass_word}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoMdLock className="text-gray-500 text-[20px]" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton className="text-[20px]" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        variant="outlined"
                        placeholder="Re-enter your password"
                        name='re_pass_word'
                        onChange={handleChange}
                        margin="dense"
                        value={account.re_pass_word}
                        error={!!errors.re_pass_word}
                        helperText={errors.re_pass_word}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoMdLock className="text-gray-500 text-[20px]" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton className="text-[20px]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                        Sign Up
                    </Button>
                    <Typography className="text-center text-gray-600 text-sm">
                        Already have an account?{" "}
                        <span onClick={handleOpen} className="text-blue-500 cursor-pointer hover:underline">Log in</span>
                    </Typography>
                </DialogContent>
                <DialogActions className="justify-center pb-5 mb-4">
                    <Typography className="text-gray-500 text-xs">
                        By signing up, you agree to our{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">Terms</span> and{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>.
                    </Typography>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalSignUp;