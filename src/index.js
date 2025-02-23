import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as serviceWorker from "./serviceWorker";
import { Routes } from "./routes/routes";

// Create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#2c3e50',
        },
        secondary: {
            main: '#3498db',
        },
        background: {
            default: '#f5f6fa',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#2c3e50',
                    color: '#ffffff',
                },
            },
        },
        MuiChart: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
    },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    </React.StrictMode>
);

serviceWorker.unregister();
