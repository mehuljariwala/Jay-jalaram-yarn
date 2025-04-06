import React, { useState } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { ResponsiveContainer, Treemap, Tooltip } from "recharts";

const ColorCombinationChart = ({ data }) => {
  const [selectedColor, setSelectedColor] = useState("all");

  // Get all unique colors from the data
  const uniqueColors =
    data && data.orders
      ? [
          ...new Set(
            data.orders.flatMap((order) => order.colors.map((c) => c.color))
          ),
        ]
      : [];

  // Process data for the treemap
  const processData = () => {
    if (!data || !data.orders || data.orders.length === 0) {
      return [];
    }

    // Create a map of color combinations
    const colorCombinations = {};

    data.orders.forEach((order) => {
      if (order.colors.length < 2) return; // Skip orders with only one color

      // If a specific color is selected, only include combinations with that color
      if (selectedColor !== "all") {
        if (!order.colors.some((c) => c.color === selectedColor)) {
          return;
        }
      }

      // Create combinations of colors in this order
      for (let i = 0; i < order.colors.length; i++) {
        for (let j = i + 1; j < order.colors.length; j++) {
          const color1 = order.colors[i].color;
          const color2 = order.colors[j].color;

          // Skip if we're filtering by a specific color and neither color matches
          if (
            selectedColor !== "all" &&
            color1 !== selectedColor &&
            color2 !== selectedColor
          ) {
            continue;
          }

          // Create a key for this combination (alphabetical order to avoid duplicates)
          const key = [color1, color2].sort().join(" + ");

          if (colorCombinations[key]) {
            colorCombinations[key]++;
          } else {
            colorCombinations[key] = 1;
          }
        }
      }
    });

    // Convert to array format for the treemap
    return Object.keys(colorCombinations)
      .map((combination) => ({
        name: combination,
        value: colorCombinations[combination],
      }))
      .sort((a, b) => b.value - a.value) // Sort by frequency
      .slice(0, 20); // Take top 20 for readability
  };

  const chartData = processData();

  // Format data for treemap
  const treemapData = {
    name: "Color Combinations",
    children: chartData,
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>{payload[0].payload.name}</strong>
          </p>
          <p style={{ margin: 0 }}>Frequency: {payload[0].value} orders</p>
        </div>
      );
    }
    return null;
  };

  // If no data, show a message
  if (chartData.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No color combination data available
        </Typography>
      </Paper>
    );
  }

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: "400px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            Color Combinations
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Most frequent color combinations in orders
          </Typography>
        </div>

        <FormControl size="small" sx={{ minWidth: "150px" }}>
          <InputLabel id="color-select-label">Filter by Color</InputLabel>
          <Select
            labelId="color-select-label"
            value={selectedColor}
            label="Filter by Color"
            onChange={handleColorChange}
          >
            <MenuItem value="all">All Colors</MenuItem>
            {uniqueColors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treemapData}
          dataKey="value"
          nameKey="name"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ColorCombinationChart;
