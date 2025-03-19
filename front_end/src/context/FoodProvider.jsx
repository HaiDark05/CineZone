import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextFood = createContext();

export const FoodProvider = ({children}) => {
    const [foodSV, setFoodSV] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/food');
                setFoodSV(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextFood.Provider value={{foodSV, update, setUpdate}}>
            {children}
        </ContextFood.Provider>
    );
}

export default FoodProvider;