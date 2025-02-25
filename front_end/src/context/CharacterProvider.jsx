import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextCharacters = createContext();

export const CharacterProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/characters');
                setCharacters(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextCharacters.Provider value={{characters, update, setUpdate}}>
            {children}
        </ContextCharacters.Provider>
    );
}

export default CharacterProvider;