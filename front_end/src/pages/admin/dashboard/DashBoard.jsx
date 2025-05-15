import { Box, Grid } from '@mui/material';
import React from 'react';
import PlanSubscriptionPieChart from './PlanSubscriptionPieChart';
import PlanSubscriptionBarChart from './PlanSubscriptionBarChart';

function DashBoard(props) {
    return (
        <div className='m-auto p-4'>
            <Grid container spacing={2} className="p-4">
                <Grid item xs={6}>
                    <div className="bg-blue-500 h-40 rounded-xl shadow-md">
                        <PlanSubscriptionPieChart/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="bg-green-500 h-40 rounded-xl shadow-md">
                        <PlanSubscriptionBarChart/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default DashBoard;