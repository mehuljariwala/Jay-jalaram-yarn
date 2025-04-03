import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    IconButton,
} from '@mui/material';
import { NavigateNext, TrendingUp } from '@mui/icons-material';
import MetricCard from './MetricCard';
import SessionsChart from './SessionsChart';
import PageViewsChart from './PageViewsChart';

// Sample data for metric cards
const generateTrendData = (baseValue, trend) => {
    return Array.from({ length: 10 }, (_, i) => ({
        value: baseValue + (trend === 'up' ? i * 10 : -i * 10) + Math.random() * 20
    }));
};

const metrics = [
    {
        title: 'Users',
        value: '14k',
        change: 25,
        data: generateTrendData(100, 'up'),
    },
    {
        title: 'Conversions',
        value: '325',
        change: -25,
        data: generateTrendData(300, 'down'),
    },
    {
        title: 'Event count',
        value: '200k',
        change: 5,
        data: generateTrendData(180000, 'up'),
    },
];

export default function DashboardContent() {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Overview Section */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
                Overview
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {metrics.map((metric, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <MetricCard {...metric} />
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={3}>
                    <Box
                        sx={{
                            p: 2.5,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            bgcolor: 'white',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TrendingUp sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
                                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                                    Explore your data
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Uncover performance and visitor insights with our data wizardry.
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{
                                alignSelf: 'flex-start',
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            <NavigateNext />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SessionsChart />
                </Grid>
                <Grid item xs={12}>
                    <PageViewsChart />
                </Grid>
            </Grid>
        </Container>
    );
}