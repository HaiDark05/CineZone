import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextAuthors = createContext()

export const AuthorsProvider = ({children}) => {
    const [authors, setAuthors] = useState([]);
    const [update,setUpdate] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/authors');
                setAuthors(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextAuthors.Provider value={{authors, update, setUpdate}}>
            {children}
        </ContextAuthors.Provider>
    );
}

export default AuthorsProvider;