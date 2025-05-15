import React, { useEffect, useState } from 'react';
import TableBookingRecords from './TableBookingRecords';
import BoxSearchClient from '../../../components/BoxSearchRecord';

function MovieBookingRecords(props) {
    const [searchObject, setSearchObject] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
            <div className="bg-[linear-gradient(-20deg,_#e9defa_0%,_#fbfcdb_100%)] p-2">
                <BoxSearchClient title={"Booking Records"} searchObject={searchObject} setSearchObject={setSearchObject} />
                <div className="p-3 m-auto">
                    <TableBookingRecords searchObject={searchObject} setSearchObject={setSearchObject} />
                </div>
            </div>
        </>
    );
}

export default MovieBookingRecords;