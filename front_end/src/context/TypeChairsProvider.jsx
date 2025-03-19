import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextTypeChairs = createContext();

export const TypeChairsProvider = ({children}) =>  {
    const [typeChairs, setTypeChairs] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/typechairs');
                setTypeChairs(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextTypeChairs.Provider value={{typeChairs, update, setUpdate}}>
            {children}
        </ContextTypeChairs.Provider>
    );
}

export default TypeChairsProvider;