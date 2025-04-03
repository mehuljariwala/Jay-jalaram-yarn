import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, change, data, trend }) => {
    const isPositive = change > 0;
    const color = isPositive ? '#4caf50' : '#f44336';
    const neutralColor = '#5B6B79';

    return (
        <Box
            sx={{
                p: 2.5,
                bgcolor: 'white',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontSize: '0.875rem' }}
            >
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 0.5 }}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'text.primary',
                        mr: 1,
                    }}
                >
                    {value}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: change === 0 ? neutralColor : color,
                        backgroundColor: `${change === 0 ? neutralColor : color}15`,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                    }}
                >
                    {isPositive ? '+' : ''}{change}%
                </Typography>
            </Box>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 2 }}
            >
                Last 30 days
            </Typography>
            <Box sx={{ height: 40 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={1.5}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default MetricCard;