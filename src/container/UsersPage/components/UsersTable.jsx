import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TablePagination,
    TableSortLabel,
    TextField,
    InputAdornment,
    Box,
    Button,
    Tooltip,
    Chip,
    alpha,
    Fade,
    Skeleton,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Add as AddIcon,
} from '@mui/icons-material';

// Function to sort data
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'partyName', label: 'Party name' },
    { id: 'partyAddress', label: 'Party address' },
    { id: 'partyRoute', label: 'Party route' },
    { id: 'userId', label: 'User ID' },
    { id: 'password', label: 'Password' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
];

// Loading skeleton component
const TableSkeleton = () => (
    <TableBody>
        {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
                {[...Array(8)].map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                        <Skeleton animation="wave" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableBody>
);

export default function UsersTable({
    data,
    onEdit,
    onDelete,
    onStatusChange,
    onAdd,
}) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filter data based on search term
    const filteredData = data.filter((row) =>
        Object.values(row)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    // Sort and slice data for current page
    const sortedData = stableSort(filteredData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper
            sx={{
                width: '100%',
                mb: 2,
                overflow: 'hidden',
                boxShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.1)}`,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    alignItems: { xs: 'stretch', sm: 'center' },
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <TextField
                    placeholder="Search users..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAdd}
                    sx={{
                        whiteSpace: 'nowrap',
                        px: 3,
                        boxShadow: 2,
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 4,
                        },
                        transition: 'all 0.2s',
                    }}
                >
                    Add User
                </Button>
            </Box>
            <Box sx={{ overflow: 'hidden', width: '100%' }}>
                <TableContainer
                    sx={{
                        maxHeight: { xs: 'calc(100vh - 200px)', sm: 'calc(100vh - 250px)', md: 'calc(100vh - 300px)' },
                        overflowX: 'auto',
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        width: '100%',
                        '&::-webkit-scrollbar': {
                            height: { xs: '4px', sm: '8px' },
                            width: { xs: '4px', sm: '8px' }
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
                        },
                        // Ensure smooth scrolling on iOS
                        '-webkit-overflow-scrolling': 'touch',
                        // Prevent content from expanding container
                        maxWidth: '100vw',
                        boxSizing: 'border-box',
                        // Add some padding for mobile scrollbars
                        pr: { xs: 1, sm: 0 }
                    }}
                >
                    <Table
                        stickyHeader
                        sx={{
                            minWidth: { xs: 650, sm: 800, md: '100%' },
                            '& .MuiTableCell-root': {
                                padding: { xs: '8px 4px', sm: '16px' }
                            }
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        sx={{
                                            fontWeight: 600,
                                            whiteSpace: 'nowrap',
                                            backgroundColor: (theme) => theme.palette.background.default,
                                            padding: { xs: '12px 8px', sm: '16px' },
                                            fontSize: { xs: '0.875rem', sm: '1rem' },
                                        }}
                                    >
                                        {headCell.id !== 'actions' ? (
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={() => handleRequestSort(headCell.id)}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        ) : (
                                            headCell.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            <TableBody>
                                {sortedData.map((row, index) => (
                                    <Fade in={true} style={{ transformOrigin: '0 0 0' }} timeout={200 + index * 50}>
                                        <TableRow
                                            hover
                                            key={row.id}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.04),
                                                    '& .action-buttons': {
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        >
                                            <TableCell
                                                sx={{
                                                    width: { xs: '40px', sm: 'auto' },
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }}
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                    width: { xs: '80px', sm: '150px', md: '200px' },
                                                    maxWidth: { xs: '80px', sm: '150px', md: '200px' },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <Tooltip title={row.partyName}>
                                                    <span>{row.partyName}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                    width: { xs: '100px', sm: '150px', md: '200px' },
                                                    maxWidth: { xs: '100px', sm: '150px', md: '200px' },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <Tooltip title={row.partyAddress}>
                                                    <span>{row.partyAddress}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: { xs: '80px', sm: 'auto' },
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }}
                                            >
                                                <Chip
                                                    label={row.partyRoute}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: (theme) => alpha(theme.palette.info.main, 0.1),
                                                        color: 'info.main',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: { xs: '80px', sm: '120px', md: '150px' },
                                                    maxWidth: { xs: '80px', sm: '120px', md: '150px' },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }}
                                            >
                                                <Tooltip title={row.userId}>
                                                    <span>{row.userId}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: { xs: '80px', sm: '120px', md: '150px' },
                                                    maxWidth: { xs: '80px', sm: '120px', md: '150px' },
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }}
                                            >
                                                <Tooltip title={row.password}>
                                                    <span>{row.password}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell sx={{
                                                width: { xs: '70px', sm: '100px' },
                                                padding: { xs: '8px 4px', sm: '16px' }
                                            }}>
                                                <Chip
                                                    label={row.status}
                                                    size="small"
                                                    onClick={() => onStatusChange(row.id)}
                                                    sx={{
                                                        backgroundColor: row.status === 'Enable'
                                                            ? (theme) => alpha(theme.palette.success.main, 0.1)
                                                            : (theme) => alpha(theme.palette.error.main, 0.1),
                                                        color: row.status === 'Enable' ? 'success.main' : 'error.main',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)',
                                                        },
                                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                        height: { xs: '24px', sm: '32px' }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{
                                                width: { xs: '80px', sm: '120px' },
                                                padding: { xs: '8px 4px', sm: '16px' }
                                            }}>
                                                <Box
                                                    className="action-buttons"
                                                    sx={{
                                                        opacity: { xs: 1, sm: 0 },
                                                        transition: 'opacity 0.2s',
                                                        display: 'flex',
                                                        gap: { xs: 0.5, sm: 1 },
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => onEdit(row)}
                                                            sx={{
                                                                padding: { xs: '4px', sm: '8px' },
                                                                color: 'primary.main',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',
                                                                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                                                },
                                                            }}
                                                        >
                                                            <EditIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => onDelete(row.id)}
                                                            sx={{
                                                                padding: { xs: '4px', sm: '8px' },
                                                                color: 'error.main',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',
                                                                    backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
                                                                },
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </Fade>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </Box>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    '.MuiTablePagination-toolbar': {
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        padding: { xs: '8px', sm: '16px' },
                    },
                    '.MuiTablePagination-selectLabel': {
                        margin: { xs: 0, sm: 'auto' },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    },
                    '.MuiTablePagination-select': {
                        marginRight: { xs: '8px', sm: '16px' },
                    },
                    '.MuiTablePagination-displayedRows': {
                        margin: { xs: '8px 0', sm: 'auto' },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    },
                    '.MuiTablePagination-actions': {
                        marginLeft: { xs: 0, sm: '20px' },
                    },
                }}
            />
        </Paper>
    );
}