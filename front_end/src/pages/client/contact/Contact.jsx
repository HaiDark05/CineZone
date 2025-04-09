import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
const inner = { name: "", email: "", phone: "", message: "" }
function Contact(props) {
    const [formContact, setFormContact] = useState(inner);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormContact((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    return (
        <div className="bg-gradient-to-r from-black via-gray-700 to-zinc-400 text-white flex justify-evenly items-center p-4">
            <div className="max-w-lg bg-white text-black shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

                <div className="flex items-center gap-3 mb-3">
                    <div className="border border-teal-500 rounded-full p-2 shadow-lg">
                        <FaLocationDot className="text-teal-500 text-2xl" />
                    </div>
                    <p className="text-lg font-medium">
                        404 Trần Cao Vân - Phường Xuân Hà - Quận Thanh Khê - TP. Đà Nẵng
                    </p>
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <div className="border border-teal-500 rounded-full p-2 shadow-lg">
                        <FaPhoneAlt className="text-teal-500 text-2xl" />
                    </div>
                    <p className="text-lg font-medium">0775493859</p>
                </div>

                <div className="flex items-start gap-3 mb-3">
                    <div className="border border-teal-500 rounded-full p-2 shadow-lg">
                        <IoIosMail className="text-teal-500 text-2xl" />
                    </div>
                    <div>
                        <p className="text-lg font-medium">hainguyen.08052003@gmail.com</p>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="text-blue-600 text-xl hover:scale-110 transition"><FaFacebookF /></a>
                    <a href="#" className="text-blue-400 text-xl hover:scale-110 transition"><FaTwitter /></a>
                    <a href="#" className="text-red-500 text-xl hover:scale-110 transition"><FaGoogle /></a>
                    <a href="#" className="text-black text-xl hover:scale-110 transition"><FaTiktok /></a>
                </div>
            </div>
            <div className="">
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    sx={{
                        bgcolor: "white",
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                        mt: 5,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" color='black'>
                        Send a Contact Message
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, my: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formContact.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formContact.email}
                            onChange={handleChange}
                            required
                        />
                    </Box>

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formContact.phone}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formContact.message}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white font-semibold py-3 rounded hover:bg-gray-600 transition"
                    >
                        SEND
                    </button>
                </Box>
            </div>
        </div>
    );
}

export default Contact;