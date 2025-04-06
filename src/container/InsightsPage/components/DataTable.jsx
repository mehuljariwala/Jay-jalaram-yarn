/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const DataTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [filteredData, setFilteredData] = useState([]);
  const [colorFilter, setColorFilter] = useState("all");
  const [quantityFilter, setQuantityFilter] = useState("all");

  // Get all unique colors from the data
  const uniqueColors =
    data && data.orders
      ? [
          ...new Set(
            data.orders.flatMap((order) => order.colors.map((c) => c.color))
          ),
        ]
      : [];

  // Process and filter data
  useEffect(() => {
    if (!data || !data.orders) {
      setFilteredData([]);
      return;
    }

    let filtered = [...data.orders];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.colors.some((c) => c.color.toLowerCase().includes(term))
      );
    }

    // Apply color filter
    if (colorFilter !== "all") {
      filtered = filtered.filter((order) =>
        order.colors.some((c) => c.color === colorFilter)
      );
    }

    // Apply quantity filter
    if (quantityFilter !== "all") {
      let min = 0,
        max = Infinity;

      switch (quantityFilter) {
        case "small":
          min = 1;
          max = 10;
          break;
        case "medium":
          min = 11;
          max = 30;
          break;
        case "large":
          min = 31;
          max = Infinity;
          break;
      }

      filtered = filtered.filter((order) => {
        const totalQty = order.colors.reduce((sum, c) => sum + c.quantity, 0);
        return totalQty >= min && totalQty <= max;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (orderBy) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "customer":
          aValue = a.customer;
          bValue = b.customer;
          break;
        case "quantity":
          aValue = a.totalQuantity;
          bValue = b.totalQuantity;
          break;
        case "colors":
          aValue = a.colors.length;
          bValue = b.colors.length;
          break;
        default:
          aValue = a[orderBy];
          bValue = b[orderBy];
      }

      if (order === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    setFilteredData(filtered);
  }, [data, searchTerm, orderBy, order, colorFilter, quantityFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleColorFilterChange = (event) => {
    setColorFilter(event.target.value);
    setPage(0);
  };

  const handleQuantityFilterChange = (event) => {
    setQuantityFilter(event.target.value);
    setPage(0);
  };

  if (!data || !data.orders || filteredData.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No data available. Please upload an MDB file or adjust your filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Order Data
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" paragraph>
        Detailed view of all orders with search and filter capabilities
      </Typography>

      {/* Search and Filter Controls */}
      <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, minWidth: "200px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search by order ID, customer, or color"
        />

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel id="color-filter-label">Color</InputLabel>
          <Select
            labelId="color-filter-label"
            value={colorFilter}
            label="Color"
            onChange={handleColorFilterChange}
          >
            <MenuItem value="all">All Colors</MenuItem>
            {uniqueColors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel id="quantity-filter-label">Quantity</InputLabel>
          <Select
            labelId="quantity-filter-label"
            value={quantityFilter}
            label="Quantity"
            onChange={handleQuantityFilterChange}
          >
            <MenuItem value="all">All Quantities</MenuItem>
            <MenuItem value="small">Small (1-10)</MenuItem>
            <MenuItem value="medium">Medium (11-30)</MenuItem>
            <MenuItem value="large">Large (31+)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Data Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="order data table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "orderId"}
                  direction={orderBy === "orderId" ? order : "asc"}
                  onClick={() => handleRequestSort("orderId")}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "customer"}
                  direction={orderBy === "customer" ? order : "asc"}
                  onClick={() => handleRequestSort("customer")}
                >
                  Customer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "colors"}
                  direction={orderBy === "colors" ? order : "asc"}
                  onClick={() => handleRequestSort("colors")}
                >
                  Colors
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "quantity"}
                  direction={orderBy === "quantity" ? order : "asc"}
                  onClick={() => handleRequestSort("quantity")}
                >
                  Total Quantity
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.orderId} hover>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {order.colors.map((color, index) => (
                        <Chip
                          key={index}
                          label={`${color.color}: ${color.quantity}`}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{order.totalQuantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
