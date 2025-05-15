import { Button, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { IoMdLock } from 'react-icons/io';
import { MdClose, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { ContextAccounts } from '../../../context/AccountsProvider';
import axios from 'axios';
import { useNotification } from '../../../context/NotificationContext';

const inner = { pass_word: "", re_pass_word: "" };
function ModalChangePass({email, openRePass, handleCloseRePass, handleCloseForgot}) {
    const { accounts, update, setUpdate } = useContext(ContextAccounts);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [changePassword, setChangePassword] = useState(inner);
    const [errors,setError] = useState("");
    const showNotification = useNotification();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setChangePassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const updateAccount = async () => {

        if(changePassword.pass_word !== changePassword.re_pass_word){
            setError("mat khau ko khop!!!");
            return;
        }
       const account = accounts.find(a => a.email == email);
       await axios.put(`http://localhost:8080/api/accounts/${account.id}`, {...account, pass_word : changePassword.pass_word});
       setUpdate(!update);
       showNotification("You have successfully change password!", "success");
       handleCloseForgot();
    }

    return (
        <div>
            <Dialog
                open={openRePass}
                onClose={handleCloseRePass}
                maxWidth="xs"
                fullWidth
                className="transition-opacity duration-300 ease-in-out"
            >
                {/* Close Button */}
                <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={handleCloseRePass}
                >
                    <MdClose className="text-[20px]" />
                </IconButton>

                {/* Title */}
                <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                    Forgot Password
                </DialogTitle>
                <DialogContent className="p-6 space-y-4">
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        placeholder="Create a password"
                        name='pass_word'
                        margin="dense"
                        onChange={handleChange}
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
                        onClick={updateAccount}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                        Change Password
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalChangePass;