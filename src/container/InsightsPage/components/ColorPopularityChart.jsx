import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const ColorPopularityChart = ({ data }) => {
  // Process data for the bar chart
  const processData = () => {
    if (!data || !data.orders || data.orders.length === 0) {
      return [];
    }

    // Count occurrences of each color in orders
    const colorCounts = {};

    data.orders.forEach((order) => {
      order.colors.forEach((item) => {
        if (colorCounts[item.color]) {
          colorCounts[item.color]++;
        } else {
          colorCounts[item.color] = 1;
        }
      });
    });

    // Convert to array format for the bar chart
    return Object.keys(colorCounts)
      .map((color) => ({
        name: color,
        count: colorCounts[color],
      }))
      .sort((a, b) => b.count - a.count) // Sort by popularity
      .slice(0, 10); // Take top 10 for readability
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
        Color Popularity
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Top 10 most frequently ordered colors
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 70,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#666" }}
            tickLine={false}
            axisLine={true}
            width={60}
          />
          <Tooltip
            formatter={(value) => [`${value} orders`, "Frequency"]}
            labelFormatter={(value) => `Color: ${value}`}
          />
          <Bar dataKey="count" fill="#2196f3" radius={[0, 4, 4, 0]}>
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ColorPopularityChart;
