import React from "react";
import {
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const FilterPanel = ({ filters, onFilterChange, availableColors }) => {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FilterAltIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6">Filter Data</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="date-range-label">Date Range</InputLabel>
            <Select
              labelId="date-range-label"
              id="date-range"
              value={filters.dateRange}
              label="Date Range"
              onChange={(e) => onFilterChange("dateRange", e.target.value)}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="last30">Last 30 Days</MenuItem>
              <MenuItem value="last90">Last 90 Days</MenuItem>
              <MenuItem value="last180">Last 180 Days</MenuItem>
              <MenuItem value="lastYear">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="color-filter-label">Color</InputLabel>
            <Select
              labelId="color-filter-label"
              id="color-filter"
              value={filters.colorFilter}
              label="Color"
              onChange={(e) => onFilterChange("colorFilter", e.target.value)}
            >
              <MenuItem value="all">All Colors</MenuItem>
              {availableColors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="quantity-range-label">Quantity Range</InputLabel>
            <Select
              labelId="quantity-range-label"
              id="quantity-range"
              value={filters.quantityRange}
              label="Quantity Range"
              onChange={(e) => onFilterChange("quantityRange", e.target.value)}
            >
              <MenuItem value="all">All Quantities</MenuItem>
              <MenuItem value="small">Small (1-10)</MenuItem>
              <MenuItem value="medium">Medium (11-30)</MenuItem>
              <MenuItem value="large">Large (31+)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPanel;
