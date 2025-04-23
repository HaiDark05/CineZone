import { Card, CardContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { COLORS } from '../../../utils/Containts';
import { ContextBookings } from '../../../context/BookingsProvider';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
        const { name, value } = payload[0]; // ✅ name = title, value = total
        return (
            <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px'
            }}>
                <p style={{ color: payload[0].color }}>{name}</p>
                <p>Số lượng: {value.toLocaleString()} đ</p>
            </div>
        );
    }
    return null;
};

// Custom Legend Component
const CustomLegend = ({ payload }) => {
    return (
        <ul style={{ listStyleType: 'none', padding: 0, display: "flex", justifyContent: "space-evenly" }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ backgroundColor: entry.color, borderRadius: '50%', width: 12, height: 12, display: 'inline-block', marginRight: 5 }} />
                    <span>{entry.payload.title}</span> {/* Displaying the plan name with "Gói:" prefix */}
                </li>
            ))}
        </ul>
    );
}

function PlanSubscriptionBarChart(props) {
    const { bookings } = useContext(ContextBookings);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns a value from 0 to 11
    const currentYear = currentDate.getFullYear(); // Get current year
    const [data, setData] = useState([]);
    // Initialize state with current month and year
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const handleYearChange = (event) => {
        const value = event.target.value;
        setSelectedYear(value);
    };

    const handleMonthChange = (event) => {
        const value = event.target.value;
        setSelectedMonth(value);
    };


    const yearOptions = [2024, 2025, 2026].map((year) => (
        <MenuItem key={year} value={year}>{year}</MenuItem>
    ));

    const monthOptions = Array.from({ length: 12 }, (_, i) => (
        <MenuItem key={i + 1} value={i + 1}>
            Tháng {i + 1}
        </MenuItem>
    ));

    useEffect(() => {
        const booking = bookings.filter(b => {
            const bookingDate = new Date(b.booking_date);
            return (
                bookingDate.getFullYear() === selectedYear &&
                bookingDate.getMonth() + 1 === selectedMonth
            );
        });
        const totalFood = booking.reduce((sum, item) => sum + item.totalFood, 0);
        const totalChair = booking.reduce((sum, item) => sum + item.totalChair, 0);
        const result = [
            {
                id: 1,
                title: "Total Food",
                total: totalFood
            },
            {
                id: 2,
                title: "Total Chair",
                total: totalChair
            }
        ];
        setData(result);

    }, [selectedMonth, selectedYear, bookings]);

    return (
        <div>
            <div className="">
                <Card>
                    <CardContent>
                        <div className="flex justify-between gap-2 border-2 p-2 items-center">
                            <h1 className='text-nowrap text-black'>Thong ke theo gia do an</h1>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Chọn mục</InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedMonth}
                                    label="Chọn tháng"
                                    onChange={handleMonthChange}
                                >
                                    {monthOptions}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Chọn mục</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedYear}
                                    label="Chọn mục"
                                    onChange={handleYearChange}
                                >
                                    {yearOptions}
                                </Select>
                            </FormControl>
                        </div>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ title, percent }) => `${title}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="total" // ✅ Sửa lại đúng key
                                    nameKey="title" // ✅ hiển thị tên
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PlanSubscriptionBarChart;