import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextRegions = createContext();

export const RegionsProvider = ({children}) => {
    const [regions, setRegions] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/regions');
                setRegions(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextRegions.Provider value={{ regions, update, setUpdate }}>
            {children}
        </ContextRegions.Provider>
    );
}

export default RegionsProvider;