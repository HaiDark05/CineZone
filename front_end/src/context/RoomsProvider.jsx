import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextRooms = createContext();
export const RoomsProvider = ({children}) => {
    const [rooms, setRooms] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextRooms.Provider value={{rooms, update, setUpdate}}>
            {children}
        </ContextRooms.Provider>
    );
}

export default RoomsProvider;