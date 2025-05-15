import React, { useState } from 'react';
import HeaderClient from './HeaderClient';
import FooterClient from './FooterClient';
import ClientRouters from '../../../routes/ClientRouters';
import ModalLogin from '../ComponentClient/ModalLogin';
import ModalSignUp from '../ComponentClient/ModalSignUp';
import ChatBot from '../chat_bot/ChatBot';

function ClientDashBoard(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        handleCloseSignUp();
    };
    const handleClose = () => setOpen(false);

    const [openSignUp, setOpenSignUp] = useState(false);
    const handleOpenSignUp = () => {
        setOpenSignUp(true);
        handleClose();
    };
    const handleCloseSignUp = () => setOpenSignUp(false);
    
    return (
        <div className=''>
            <div className="sticky top-0 z-50">
                <HeaderClient handleOpen={handleOpen} />
            </div>
            <div className="">
                <ClientRouters />
                <FooterClient />
            </div>
            <ModalLogin open={open} handleClose={handleClose} handleOpenSignUp={handleOpenSignUp} />
            <ModalSignUp openSignUp={openSignUp} handleCloseSignUp={handleCloseSignUp} handleOpen={handleOpen} />
            <ChatBot/>
        </div>
    );
}

export default ClientDashBoard;