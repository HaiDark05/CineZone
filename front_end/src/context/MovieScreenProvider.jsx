import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ContextMovieScreens = createContext();

export const MovieScreenProvider = ({children}) => {
    const [movieScreens, setMovieScreens] = useState([]);
    const [update,setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/moviescreens');
                setMovieScreens(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [update]);
    return (
        <ContextMovieScreens.Provider value={{movieScreens, update, setUpdate}}>
            {children}
        </ContextMovieScreens.Provider>
    );
}

export default MovieScreenProvider;