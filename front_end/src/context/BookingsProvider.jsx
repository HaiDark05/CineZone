import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextBookings = createContext();

export const BookingsProvider = ({children}) => {
    const [bookings, setBookings] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookings');
                setBookings(response.data);
                
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextBookings.Provider value={{bookings, update, setUpdate}}>
            {children}
        </ContextBookings.Provider>
    );
}

export default BookingsProvider;