import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextCinemas = createContext();

export const CinemasProvider = ({children}) => {
    const [cinemas, setCinemas] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cinemas');
                setCinemas(response.data);
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextCinemas.Provider value={{ cinemas, update, setUpdate }}>
            {children}
        </ContextCinemas.Provider>
    );
}

export default CinemasProvider;