import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextActors = createContext();

export const ActorsProvider = ({children}) => {
    const [actors, setActors] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/actors');
                setActors(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextActors.Provider value={{actors, update, setUpdate}}>
            {children}
        </ContextActors.Provider>
    );
}

export default ActorsProvider;