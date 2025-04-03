import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
    Container,
    TextField,
    InputAdornment,
    Breadcrumbs,
    Link,
    ListItemButton,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard,
    People,
    ShoppingCart,
    Settings,
    Analytics,
    Inventory,
    Close,
    Search,
    NavigateNext,
} from '@mui/icons-material';

const drawerWidth = 280;

const AdminConfigPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <Dashboard />,
            path: '/admin-config/dashboard'
        },
        {
            text: 'Users',
            icon: <People />,
            path: '/admin-config/users'
        },
        {
            text: 'Analytics',
            icon: <Analytics />,
            path: '/admin-config/analytics'
        },
        {
            text: 'Products',
            icon: <Inventory />,
            path: '/admin-config/products'
        },
        {
            text: 'Orders',
            icon: <ShoppingCart />,
            path: '/admin-config/orders'
        },
        {
            text: 'Settings',
            icon: <Settings />,
            path: '/admin-config/settings'
        },
    ];

    const handleMenuClick = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    // Get current page title from path
    const getCurrentPageTitle = () => {
        const currentPath = location.pathname.split('/').pop();
        return currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
    };

    const drawer = (
        <Box sx={{ height: '100%', backgroundColor: '#1a1a1a' }}>
            {/* Header */}
            <Box sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Admin Panel
                </Typography>
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                )}
            </Box>

            {/* Menu Items */}
            <List sx={{ p: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => handleMenuClick(item.path)}
                            sx={{
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                    '& .MuiListItemText-primary': {
                                        color: 'white',
                                        fontWeight: 600,
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateX(8px)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: 40,
                                color: location.pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.7)',
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '0.95rem',
                                        fontWeight: location.pathname === item.path ? 600 : 400,
                                        color: location.pathname === item.path ? 'white' : 'rgba(255, 255, 255, 0.7)',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                ) : (
                    <Drawer
                        variant="permanent"
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                )}
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: '#f8f9fa',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Top Bar */}
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        backgroundColor: 'white',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
                        <Toolbar
                            disableGutters
                            sx={{
                                flexDirection: { xs: 'column', sm: 'row' },
                                py: { xs: 2, sm: 1 },
                                alignItems: { xs: 'stretch', sm: 'center' },
                                gap: { xs: 2, sm: 0 }
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ mr: 2, display: { md: 'none' }, color: 'black' }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Breadcrumbs
                                        separator={<NavigateNext fontSize="small" />}
                                        sx={{
                                            '& .MuiBreadcrumbs-ol': {
                                                flexWrap: 'nowrap'
                                            },
                                            '& .MuiBreadcrumbs-li': {
                                                minWidth: 0,
                                                '& > *': {
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }
                                            }
                                        }}
                                    >
                                        <Link
                                            color="inherit"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/admin-config/dashboard');
                                            }}
                                            sx={{
                                                textDecoration: 'none',
                                                color: 'text.secondary',
                                                '&:hover': { color: 'primary.main' }
                                            }}
                                        >
                                            Dashboard
                                        </Link>
                                        <Typography color="text.primary">
                                            {getCurrentPageTitle()}
                                        </Typography>
                                    </Breadcrumbs>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                                width: { xs: '100%', sm: 'auto' }
                            }}>
                                <TextField
                                    placeholder="Search..."
                                    size="small"
                                    sx={{
                                        width: { xs: '100%', sm: 200, md: 250 },
                                        minWidth: { sm: 150 }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    size="small"
                                    sx={{
                                        width: { xs: '100%', sm: 150 },
                                        minWidth: { sm: 120 }
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Nested Routes Content */}
                <Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default AdminConfigPage;