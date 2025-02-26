import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextMovies = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextMovies.Provider value={{movies, update, setUpdate}}>
            {children}
        </ContextMovies.Provider>
    );
}

export default MovieProvider;