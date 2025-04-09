import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Typography, InputAdornment } from "@mui/material";
import { IoMdLock } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaGooglePlusG } from "react-icons/fa";

function ModalLogin({ open, handleClose,handleOpenSignUp }) {
    const [showPassword, setShowPassword] = useState(false);

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

            <DialogContent className="p-6 space-y-4">
                {/* Email Input */}
                <TextField
                    fullWidth
                    label="Username Or Email"
                    variant="outlined"
                    placeholder="Enter your username or email"
                    margin="dense"
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
                    variant="outlined"
                    placeholder="Your password"
                    margin="dense"
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
                <Typography className="text-right text-sm text-gray-500 hover:text-gray-800 cursor-pointer">
                    Forgot password?
                </Typography>

                {/* Login Button */}
                <Button
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
