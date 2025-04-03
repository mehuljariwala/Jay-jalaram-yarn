import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Import MUI X components to ensure proper theme augmentation
import '@mui/x-date-pickers/themeAugmentation';
import '@mui/x-charts/themeAugmentation';
import '@mui/x-data-grid-pro/themeAugmentation';
import '@mui/x-tree-view/themeAugmentation';

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: 'hsl(210, 100%, 55%)',
            light: 'hsl(210, 98%, 60%)',
            dark: 'hsl(210, 100%, 35%)',
        },
        background: {
            default: 'hsl(210, 40%, 98%)',
            paper: '#ffffff',
        },
        text: {
            primary: 'hsl(210, 50%, 15%)',
            secondary: 'hsl(210, 20%, 45%)',
        },
        divider: 'hsl(210, 25%, 90%)',
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h4: {
            fontWeight: 700,
            fontSize: '1.75rem',
        },
        h6: {
            fontWeight: 600,
        },
        body2: {
            fontSize: '0.875rem',
        },
        caption: {
            fontSize: '0.75rem',
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#6b6b6b',
                        minHeight: 24,
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        borderRadius: 8,
                        backgroundColor: '#2b2b2b',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'var(--mui-palette-background-paper)',
                    border: 'none',
                    boxShadow: 'var(--mui-shadows-2)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: `0px 2px 4px ${alpha('#000', 0.05)}`,
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '0 4px',
                },
            },
        },
        // Charts customizations
        MuiChartsTooltip: {
            styleOverrides: {
                table: {
                    backgroundColor: 'var(--mui-palette-background-paper)',
                    borderRadius: 'var(--mui-shape-borderRadius)',
                    boxShadow: 'var(--mui-shadows-2)',
                    border: '1px solid',
                    borderColor: 'var(--mui-palette-divider)',
                },
            },
        },
        // DataGrid customizations
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '--DataGrid-rowHeight': '40px',
                    backgroundColor: 'var(--mui-palette-background-paper)',
                    borderRadius: 'var(--mui-shape-borderRadius)',
                },
            },
        },
    },
});

export default function AppTheme({ children, themeComponents = {} }) {
    const theme = createTheme(defaultTheme, {
        components: {
            ...defaultTheme.components,
            ...themeComponents,
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}