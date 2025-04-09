import React, { useState } from 'react';
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
import { FaGooglePlusG } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import avatarLogo from "../../../assets/avatar/avatar_default.jpg"
import axios from 'axios';

const inner = { id_role: "", imgUrl: avatarLogo, user_name: "", email: "", pass_word: "", re_pass_word: "", phone: "", gender: "" }
function ModalSignUp({ openSignUp, handleCloseSignUp, handleOpen }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [account, setAccount] = useState(inner);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    
    const handleSubmit = async () => {
        const {re_pass_word, ...newAccount } = account ;
       const accountLogin =   await axios.post("http://localhost:8080/api/accounts", newAccount);
       console.log(accountLogin); 
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
                {/* Nút Đóng */}
                <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={handleCloseSignUp}
                >
                    <MdClose className="text-[20px]" />
                </IconButton>

                {/* Tiêu đề */}
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
                    {/* Nút Đăng Ký */}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                        Sign Up
                    </Button>

                    {/* Hoặc */}
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Đăng ký với Google */}
                    <Button
                        fullWidth
                        variant="outlined"
                        className="flex items-center gap-2 justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                        <FaGooglePlusG className="text-2xl" />
                        Continue with Google
                    </Button>

                    {/* Chuyển sang Đăng Nhập */}
                    <Typography className="text-center text-gray-600 text-sm">
                        Already have an account?{" "}
                        <span onClick={handleOpen} className="text-blue-500 cursor-pointer hover:underline">Log in</span>
                    </Typography>
                </DialogContent>

                {/* Điều khoản */}
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