import React, { useState } from 'react';
import { avatarDefault } from '../../../utils/Containts';
import BoxSearch from '../../../components/BoxSearch';
import ModalCustomerAccount from './ModalCustomerAccount';
import TableCustomerAccount from './TableCustomerAccount';

const inner = { imgUrl: avatarDefault, user_name: "", email: "", id_role: "", pass_word: "" }
function ManagerUser(props) {
    const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [searchObject, setSearchObject] = useState('');
        const [account, setAccount] = useState(inner);
        const [errors, setErrors] = useState(inner);
        
        const addItem = () => {
            handleOpen();
            setAccount(inner);
            setErrors(inner);
        }
        const validation = () => {
            const newErrors = {};
            newErrors.user_name = account.user_name ? "" : "Pleas enter user name";
            newErrors.email = account.email ? "" : "Pleas enter email";
            newErrors.pass_word = account.pass_word ? "" : "Pleas enter password";
            newErrors.phone = account.phone ? "" : "Please select a phone";
            setErrors(newErrors);
            return Object.values(newErrors).every(e => e == "");
        }
    return (
       <>
        <BoxSearch addItem={addItem} title={"Customer Account"} nameBtn={"Customer Account"} setSearchObject={setSearchObject}/>
        <div className="p-3 m-auto">
            <TableCustomerAccount setAccount={setAccount} account={account} setOpen={setOpen} searchObject={searchObject} setSearchObject={setSearchObject}/>
        </div>
        <ModalCustomerAccount handleClose={handleClose} open={open} account={account} errors={errors} validation={validation} setAccount={setAccount}/>
       </>
    );
}

export default ManagerUser;