import React, { useState } from 'react';
import BoxSearchClient from '../ComponentClient/BoxSearchClient';
import TableBookingRecords from './TableBookingRecords';

function MovieBookingRecords(props) {
    const [searchObject, setSearchObject] = useState('');
    return (
        <>
            <div className="bg-[linear-gradient(-20deg,_#e9defa_0%,_#fbfcdb_100%)]">
                <BoxSearchClient title={"Booking Records"} searchObject={searchObject} setSearchObject={setSearchObject} />
                <div className="p-3 m-auto">
                    <TableBookingRecords />
                </div>
            </div>
        </>
    );
}

export default MovieBookingRecords;