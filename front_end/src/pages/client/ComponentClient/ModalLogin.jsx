import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Typography, InputAdornment } from "@mui/material";
import { IoMdLock } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaGooglePlusG } from "react-icons/fa";
import { ContextAccounts } from "../../../context/AccountsProvider";
import { useNotification } from "../../../context/NotificationContext";
import { ContextAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../../config/firebase";
import { ROLES } from "../../../utils/Containts";
import axios from "axios";
import ModalForgotPass from "./ModalForgotPass";
const inner = { user_or_email: "", pass_word: "" }
function ModalLogin({ open, handleClose, handleOpenSignUp }) {
    const [showPassword, setShowPassword] = useState(false);
    const { isLogin, saveLocal } = useContext(ContextAuth);
    const [forgot, setForgot] = useState(false);
    const { accounts, setUpdate, update } = useContext(ContextAccounts);
    const [errors, setErrors] = useState(inner);
    const [login, setLogin] = useState(inner);
    const navigate = useNavigate();
    const showNotification = useNotification();

    useEffect(() => {
        if (isLogin === null) {
            setLogin(inner);
        }
    }, [isLogin]);

    const handleOpenForgot = () => {
        setForgot(true);
    };
    const handleCloseForgot = () => setForgot(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const validation = () => {
        const newErrors = {};
        newErrors.user_or_email = login.user_or_email ? "" : "Pleas enter username or email";
        newErrors.pass_word = login.pass_word ? "" : "Pleas enter password";
        setErrors(newErrors);
        return Object.values(newErrors).every(e => e == "");
    }

    const handleSubmit = async () => {
        if (!validation()) {
            return;
        }
        const result = accounts.find(e => (e.email == login.user_or_email || e.user_name == login.user_or_email) && (e.pass_word == login.pass_word));
        if (!result) {
            showNotification("Error submitting account!", "error");
            return;
        }
        saveLocal("isLogin", result);
        showNotification("You have successfully logged in!", "success");
        handleClose();
        navigate("/");
    }

    // Google sign-in
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const response = await axios.get("http://localhost:8080/api/accounts");
            const accounts = response.data;
            const existingCustomer = accounts.find(a => a.email === result.user.email);
            let loggedInCustomer;

            if (!existingCustomer) {
                const newCustomer = {
                    user_name: result.user.displayName,
                    imgUrl: result.user.photoURL,
                    email: result.user.email,
                    id_role: ROLES.USER,
                    pass_word: "",
                };
                const accountLogin = await axios.post("http://localhost:8080/api/accounts", newCustomer);
                loggedInCustomer = accountLogin.data.account;
            } else {
                loggedInCustomer = existingCustomer;
            }
            // Lưu thông tin người dùng vào localStorage
            saveLocal("isLogin", loggedInCustomer);
            setUpdate(!update);
            handleClose();
            showNotification("You have successfully logged in!", "success");
            navigate("/");

        } catch (error) {
            console.error('Đăng nhập thất bại. Vui lòng thử lại.', error);
            showNotification("Đăng nhập thất bại. Vui lòng thử lại.", "error");
        }
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            className="transition-opacity duration-300 ease-in-out"
        >
            {/* Close Button */}
            <IconButton
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={handleClose}
            >
                <MdClose className="text-[20px]" />
            </IconButton>

            {/* Title */}
            <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                Welcome Back 👋
            </DialogTitle>
            {
                forgot ? <ModalForgotPass forgot={forgot} handleCloseForgot={handleCloseForgot} /> : <DialogContent className="p-6 space-y-4">
                    {/* Email Input */}
                    <TextField
                        fullWidth
                        label="Username Or Email"
                        name="user_or_email"
                        variant="outlined"
                        placeholder="Enter your username or email"
                        margin="dense"
                        onChange={handleChange}
                        value={login.user_or_email}
                        error={!!errors.user_or_email}
                        helperText={errors.user_or_email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoIosMail className="text-gray-500 text-[20px]" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Password Input */}
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        name="pass_word"
                        variant="outlined"
                        placeholder="Your password"
                        onChange={handleChange}
                        margin="dense"
                        value={login.pass_word}
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

                    {/* Forgot Password */}
                    <Typography onClick={handleOpenForgot} className="text-right text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                        Forgot password?
                    </Typography>

                    {/* Login Button */}
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                        Login
                    </Button>

                    {/* Divider */}
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Google Login Button */}
                    <Button
                        fullWidth
                        onClick={signInWithGoogle}
                        variant="outlined"
                        className="flex items-center gap-2 justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                        <FaGooglePlusG className="text-2xl" />
                        Continue with Google
                    </Button>

                    {/* Sign Up Link */}
                    <Typography className="text-center text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <span onClick={handleOpenSignUp} className="text-blue-500 cursor-pointer hover:underline">Sign up</span>
                    </Typography>
                </DialogContent>
            }
            <DialogActions className="justify-center pb-5 mb-4">
                <Typography className="text-gray-500 text-xs">
                    By signing in, you agree to our{" "}
                    <span className="text-blue-500 cursor-pointer hover:underline">Terms</span> and{" "}
                    <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>.
                </Typography>
            </DialogActions>
        </Dialog>
    );
}

export default ModalLogin;
