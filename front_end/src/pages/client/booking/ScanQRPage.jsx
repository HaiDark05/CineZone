import React from 'react';
import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IoCopy } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function ScanQRPage(props) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/checkout');
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl shadow-lg">
                <CardContent>
                    <Grid container spacing={4}>
                        {/* LEFT: Order Info */}
                        <Grid item xs={12} md={5}>
                            <Box className="space-y-4">
                                <Typography variant="h6">
                                    <span className="text-blue-600 font-bold">Zalo<span className="text-green-500">Pay</span></span>             
                                    <span className="text-gray-800"> - CINEZONE WEB</span>
                                </Typography>
                                <div>
                                    <Typography variant="body1" className="font-medium">
                                        Giá trị đơn hàng:
                                    </Typography>
                                    <Typography variant="h6" className="text-gray-900 font-bold">
                                        338.000₫
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="body1" className="font-medium">
                                        Mã giao dịch:
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-800">
                                        250406_135600075
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="body1" className="font-medium">
                                        Nội dung:
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-800">
                                        RIO Cinemas - Thanh toán đơn hàng #250406_135600075
                                    </Typography>
                                </div>
                                <div className="flex items-center gap-2 bg-yellow-100 p-2 rounded-md w-fit">
                                    <AccessTimeIcon fontSize="small" className="text-yellow-800" />
                                    <span className="text-sm text-yellow-800 font-medium">
                                        Giao dịch kết thúc trong: <b>14:53</b>
                                    </span>
                                </div>
                            </Box>
                        </Grid>

                        {/* RIGHT: QR Code & Payment */}
                        <Grid item xs={12} md={7}>
                            <Box className="flex flex-col items-center space-y-4">
                                <img
                                    src="/qr-demo.png"
                                    alt="QR Code"
                                    className="w-56 h-56 border-4 border-blue-500 rounded-lg"
                                />
                                <Typography variant="body2" className="text-gray-600">
                                    Ngân hàng thụ hưởng: <strong>VietCapitalBank</strong>
                                </Typography>
                                <Typography variant="h6" className="text-blue-800 font-bold">
                                    CINEZONE
                                </Typography>
                                <Typography variant="body2" className="text-gray-600 flex items-center gap-2">
                                    99ZP25095091100264 <IoCopy className='text-blue-700 text-[18px] cursor-pointer' />
                                </Typography>

                                <div className="w-full border-t pt-4">
                                    <Typography variant="body2" className="text-gray-500 mb-2 text-center">
                                        Mở ứng dụng có VietQR để thanh toán đơn hàng
                                    </Typography>
                                    <div className="flex justify-center items-center gap-3">
                                        {/* Icons đại diện ngân hàng */}
                                        {['zalopay', 'zalo', 'vietcombank', 'mbbank', 'bidv'].map((bank, index) => (
                                            <img
                                                key={index}
                                                src={`/icons/${bank}.png`}
                                                alt={bank}
                                                className="w-8 h-8 rounded-full"
                                            />
                                        ))}
                                        <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                                            +34
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIcon />}
                                    className="!mt-6 !bg-gray-600 hover:!bg-gray-800"
                                    onClick={handleBackClick}
                                >
                                    Quay lại
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default ScanQRPage;