import React from 'react';
import HeaderClient from './HeaderClient';
import FooterClient from './FooterClient';
import ClientRouters from '../../../routes/ClientRouters';

function ClientDashBoard(props) {
    return (
        <div className=''>
            <HeaderClient />
            <ClientRouters />
            <FooterClient />
        </div>
    );
}

export default ClientDashBoard;