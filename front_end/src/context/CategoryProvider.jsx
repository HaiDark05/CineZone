import React, { createContext,useEffect, useState } from 'react';
import axios from 'axios';

export const ContextCategories = createContext();

export const CategoryProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchData();
    }, [update]);

    return (
        <ContextCategories.Provider value={{categories, update, setUpdate}}>
        {children}
        </ContextCategories.Provider>
    );
}

export default CategoryProvider;