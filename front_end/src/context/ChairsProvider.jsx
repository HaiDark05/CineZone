import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextChairs = createContext();

export const ChairsProvider = ({ children }) => {
    const [chairs, setChairs] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/chairs');
                setChairs(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextChairs.Provider value={{chairs, update, setUpdate}}>
            {children}
        </ContextChairs.Provider>
    );
}

export default ChairsProvider;