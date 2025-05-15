import React from 'react';
import HeaderAdmin from './HeaderAdmin';
import Menu from './Menu';
import Main from './Main';
import AdminRouters from '../../../routes/AdminRouters';
import AdminChatBot from '../chat_bot_admin/AdminChatBot';
function AdminDashBoard(props) {
    return (
        <div className='md:flex h-screen'>
            <Menu />
            <div className="flex-1">
                <HeaderAdmin />
                <AdminRouters />
                <AdminChatBot />
            </div>
        </div>
    );
}


export default AdminDashBoard;