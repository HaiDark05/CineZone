import React, { useState } from 'react';
import TableOrderDetail from './TableOrderDetail';
import BoxSearchClient from '../../../../components/BoxSearchRecord';

function OrderDetails(props) {
    const [searchObject, setSearchObject] = useState('');
    return (
        <>
            <BoxSearchClient title={"Booking Records"} searchObject={searchObject} setSearchObject={setSearchObject} />
            <div className="p-3 m-auto">
                <TableOrderDetail searchObject={searchObject} setSearchObject={setSearchObject} />
            </div>
        </>
    );
}

export default OrderDetails;