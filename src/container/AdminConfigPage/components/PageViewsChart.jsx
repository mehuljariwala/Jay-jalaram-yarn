import React from 'react';
import { Paper, Typography } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

// Generate sample data
const data = [
    { name: 'Jan', downloads: 2000, pageViews: 3000, total: 5000 },
    { name: 'Feb', downloads: 3500, pageViews: 4500, total: 8000 },
    { name: 'Mar', downloads: 2800, pageViews: 3800, total: 6600 },
    { name: 'Apr', downloads: 3200, pageViews: 4200, total: 7400 },
    { name: 'May', downloads: 4000, pageViews: 5000, total: 9000 },
    { name: 'Jun', downloads: 3300, pageViews: 4300, total: 7600 },
    { name: 'Jul', downloads: 2900, pageViews: 3900, total: 6800 },
];

const PageViewsChart = () => {
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
                Page views and downloads
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Page views and downloads for the last 6 months
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
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
                        dataKey="name"
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
                    <Legend />
                    <Bar
                        dataKey="downloads"
                        stackId="a"
                        fill="#1976d2"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        dataKey="pageViews"
                        stackId="a"
                        fill="#90caf9"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default PageViewsChart;