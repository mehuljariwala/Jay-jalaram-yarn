import React from 'react';
import { Paper, Typography } from '@mui/material';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Generate sample data
const generateData = () => {
    const data = [];
    const baseValue = 5000;
    const days = 30;

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - i));

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: Math.floor(baseValue + Math.random() * 2000),
            prediction: Math.floor(baseValue + Math.random() * 3000),
        });
    }

    return data;
};

const SessionsChart = () => {
    const data = generateData();

    return (
        <Paper
            sx={{
                p: 3,
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Sessions
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Sessions per day for the last 30 days
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#666' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fill: '#666' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => {
                            if (value >= 1000) {
                                return `${(value / 1000).toFixed(0)}k`;
                            }
                            return value;
                        }}
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stackId="1"
                        stroke="#2196f3"
                        fill="#2196f3"
                        fillOpacity={0.6}
                    />
                    <Area
                        type="monotone"
                        dataKey="prediction"
                        stackId="1"
                        stroke="#90caf9"
                        fill="#90caf9"
                        fillOpacity={0.3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default SessionsChart;