import React, { createContext, useState } from 'react';
export const ContextBooking = createContext();
 const inner = {time : "", id_screen : "", list_chair : [], bill : []}
export const BookingContext = ({children}) => {

    const [booking, setBooking] = useState(inner);
    
    return (
            <ContextBooking.Provider value={{booking, setBooking}}>
                {children}
            </ContextBooking.Provider>
        );
}

export default BookingContext;