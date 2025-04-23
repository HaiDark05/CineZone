import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextAccounts = createContext();

export const AccountsProvider = ({children}) => {
    const [accounts, setAccounts] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/accounts');
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextAccounts.Provider value={{accounts, update, setUpdate}}>
            {children}
        </ContextAccounts.Provider>
    );
}

export default AccountsProvider;