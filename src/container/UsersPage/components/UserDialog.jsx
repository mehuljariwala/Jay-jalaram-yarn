import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    IconButton,
    Typography,
    Box,
    styled,
} from '@mui/material';
import {
    Close as CloseIcon,
    Business,
    LocationOn,
    Route as RouteIcon,
    Person,
    Lock,
    RemoveRedEye,
} from '@mui/icons-material';

const ROUTES = ['BHATAR', 'SONAL', 'LIMBAYAT'];

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 12,
        width: '100%',
        maxWidth: 800,
    },
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 8,
        backgroundColor: theme.palette.background.paper,
        '& fieldset': {
            borderColor: theme.palette.divider,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiOutlinedInput-input': {
        padding: theme.spacing(1.5, 2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1, 1.5),
            fontSize: '0.875rem',
        },
    },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiSelect-select': {
        padding: theme.spacing(1.5, 2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1, 1.5),
            fontSize: '0.875rem',
        },
    },
}));

const InputLabel = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: theme.typography.body2.fontSize,
    [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(1),
        fontSize: theme.typography.body1.fontSize,
    },
    '& .MuiSvgIcon-root': {
        fontSize: theme.typography.body1.fontSize,
        [theme.breakpoints.up('sm')]: {
            fontSize: 20,
        },
        color: theme.palette.text.secondary,
    },
}));

export default function UserDialog({
    open,
    onClose,
    user,
    onSave,
    mode = 'add'
}) {
    const [formData, setFormData] = useState({
        partyName: '',
        partyAddress: '',
        partyRoute: 'BHATAR',
        userId: '',
        password: '',
        status: 'Enable',
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                partyName: '',
                partyAddress: '',
                partyRoute: 'BHATAR',
                userId: '',
                password: '',
                status: 'Enable',
            });
        }
    }, [user, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        p: { xs: 2, sm: 3 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                    >
                        {mode === 'add' ? 'Add New User' : 'Edit User'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'error.main' },
                            padding: { xs: '4px', sm: '8px' }
                        }}
                    >
                        <CloseIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: { xs: 2, sm: 3 }, mt: { xs: 1, sm: 2 } }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: { xs: 2, sm: 3 }
                    }}>
                        <Box>
                            <InputLabel>
                                <Business /> Party Name
                            </InputLabel>
                            <StyledInput
                                name="partyName"
                                placeholder="Enter party name"
                                value={formData.partyName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <InputLabel>
                                <LocationOn /> Party Address
                            </InputLabel>
                            <StyledInput
                                name="partyAddress"
                                placeholder="Enter party address"
                                value={formData.partyAddress}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <InputLabel>
                                <RouteIcon /> Party Route
                            </InputLabel>
                            <StyledSelect
                                name="partyRoute"
                                value={formData.partyRoute}
                                onChange={handleChange}
                                fullWidth
                            >
                                {ROUTES.map(route => (
                                    <MenuItem key={route} value={route}>
                                        {route}
                                    </MenuItem>
                                ))}
                            </StyledSelect>
                        </Box>

                        <Box>
                            <InputLabel>
                                <Person /> User ID
                            </InputLabel>
                            <StyledInput
                                name="userId"
                                placeholder="Enter user ID"
                                value={formData.userId}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <InputLabel>
                                <Lock /> Password
                            </InputLabel>
                            <StyledInput
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <InputLabel>
                                <RemoveRedEye /> Status
                            </InputLabel>
                            <StyledSelect
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Enable">Enable</MenuItem>
                                <MenuItem value="Disable">Disable</MenuItem>
                            </StyledSelect>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        p: { xs: 2, sm: 3 },
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        gap: { xs: 1, sm: 2 },
                        flexDirection: { xs: 'column', sm: 'row' },
                        '& > button': {
                            width: { xs: '100%', sm: 'auto' }
                        }
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{
                            minWidth: { xs: '100%', sm: 120 },
                            borderRadius: 1,
                            textTransform: 'none',
                            color: 'text.primary',
                            borderColor: 'divider',
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            minWidth: { xs: '100%', sm: 120 },
                            borderRadius: 1,
                            textTransform: 'none',
                            bgcolor: '#2f3746',
                            py: { xs: 1, sm: 1.5 },
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            '&:hover': {
                                bgcolor: '#1a2030',
                            },
                        }}
                    >
                        {mode === 'add' ? 'Add User' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </form>
        </StyledDialog>
    );
}