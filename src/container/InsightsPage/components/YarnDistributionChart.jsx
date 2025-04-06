import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Color palette for the chart
const COLORS = [
  "#1976d2",
  "#2196f3",
  "#64b5f6",
  "#90caf9",
  "#bbdefb",
  "#0d47a1",
  "#1565c0",
  "#1e88e5",
  "#42a5f5",
  "#4fc3f7",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
];

const YarnDistributionChart = ({ data }) => {
  // Process data for the pie chart
  const processData = () => {
    if (!data || !data.orders || data.orders.length === 0) {
      return [];
    }

    // Aggregate quantities by color
    const colorMap = {};

    data.orders.forEach((order) => {
      order.colors.forEach((item) => {
        if (colorMap[item.color]) {
          colorMap[item.color] += item.quantity;
        } else {
          colorMap[item.color] = item.quantity;
        }
      });
    });

    // Convert to array format for the pie chart
    return Object.keys(colorMap)
      .map((color) => ({
        name: color,
        value: colorMap[color],
      }))
      .sort((a, b) => b.value - a.value) // Sort by quantity descending
      .slice(0, 10); // Limit to top 10 colors for better visualization
  };

  const chartData = processData();

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
          No data available
        </Typography>
      </Paper>
    );
  }

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / data.totalValue) * 100).toFixed(1);

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
            <strong>{data.name}</strong>
          </p>
          <p style={{ margin: 0 }}>Quantity: {data.value}</p>
          <p style={{ margin: 0 }}>Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Add total to each item for tooltip
  const dataWithTotal = chartData.map((item) => ({
    ...item,
    totalValue: total,
  }));

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
      <Typography variant="h6" gutterBottom>
        Yarn Distribution by Color
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Proportion of each color in total yarn quantity
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            // Remove labels from pie slices to prevent overlapping
            label={false}
          >
            {dataWithTotal.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value, entry, index) => (
              <span style={{ color: "#333", fontSize: "0.85rem" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default YarnDistributionChart;
