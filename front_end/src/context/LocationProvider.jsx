import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextLocations = createContext();

export const LocationProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/location');
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextLocations.Provider value={{ locations, update, setUpdate }}>
            {children}
        </ContextLocations.Provider>
    );
}

export default LocationProvider;