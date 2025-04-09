import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextAuth = createContext()

export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/accounts/auth');
                setIsLogin(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ContextAuth.Provider value={isLogin}>
            {children}
        </ContextAuth.Provider>
    );
}

export default AuthProvider;