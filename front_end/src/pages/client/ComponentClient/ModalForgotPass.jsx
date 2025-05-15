import React, { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useNotification } from '../../../context/NotificationContext';
import { ContextAccounts } from '../../../context/AccountsProvider';
import { MdOutlineVerifiedUser } from "react-icons/md";
import emailjs from 'emailjs-com';
import { CONFIRM_CODE, YOUR_SERVICE_ID, YOUR_USER_ID } from '../../../utils/Containts';
import ModalChangePass from './ModalChangePass';
function ModalForgotPass({ forgot, handleCloseForgot }) {
    const showNotification = useNotification();
    const [email, setEmail] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [confirmCode, setConfirmCode] = useState(null);
    const [openRePass, setOpenRePass] = useState(false);
    const { accounts } = useContext(ContextAccounts);

    const handleOpenRePass = () => {
        setOpenRePass(true);
    };
    const handleCloseRePass = () => { 
        setOpenRePass(false) 
    };

    // Tạo mã xác nhận ngẫu nhiên gồm 4 chữ số
    const generateConfirmCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();  // Mã xác nhận 4 số
    };
    const handleForgot = async () => {
        const account = accounts.find(a => a.email == email);
        if (account) {
            const code = generateConfirmCode();  // Tạo mã xác nhận
            setConfirmCode(code);
            const templateParams = {
                username: account.user_name,
                confirm_code: code,  // Gửi mã xác nhận qua email
                to_email: email,  // Địa chỉ email nhận
            };
            try {
                await emailjs.send(YOUR_SERVICE_ID, CONFIRM_CODE, templateParams, YOUR_USER_ID);
                showNotification("Please check your email to get the verification code!", "success");
                setConfirmCode(code);
            } catch (error) {
                showNotification("Failed to send email. Please try again!", "error");
                console.error(error);
            }
        } else {
            showNotification("Account not sign up!", "error");
        }
    }

    const handleVerifyCode = () => {
        if (inputCode === confirmCode) {
            showNotification("Verification successful!", "success");
            handleOpenRePass();
        } else {
            showNotification("Verification code is incorrect!", "error");
        }
    };
    
    return (
        <div className="">
            <Dialog
                open={forgot}
                onClose={handleCloseForgot}
                maxWidth="xs"
                fullWidth
                className="transition-opacity duration-300 ease-in-out"
            >
                <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={handleCloseForgot}
                >
                    <MdClose className="text-[20px]" />
                </IconButton>

                <DialogTitle className="text-center text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    {confirmCode ? (
                        <>
                            <MdOutlineVerifiedUser className="text-blue-500" />
                            Verify Code
                        </>
                    ) : (
                        "Forgot Password"
                    )}
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    {!confirmCode ? (
                        <>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                placeholder="Enter your email"
                                margin="dense"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IoIosMail className="text-gray-500 text-[20px]" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                onClick={handleForgot}
                                fullWidth
                                variant="contained"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
                            >
                                Send Code
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="Confirmation Code"
                                name="confirmationCode"
                                variant="outlined"
                                placeholder="Enter the code"
                                margin="dense"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RiLockPasswordFill className="text-gray-500 text-[20px]" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                onClick={handleVerifyCode}
                                fullWidth
                                variant="contained"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
                            >
                                Verify Code
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
            <ModalChangePass handleCloseForgot={handleCloseForgot} email={email} openRePass={openRePass} handleCloseRePass={handleCloseRePass} />
        </div>
    );
}

export default ModalForgotPass;