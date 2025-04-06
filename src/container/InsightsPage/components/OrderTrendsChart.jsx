import React, { useState } from "react";
import {
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OrderTrendsChart = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  const handleTimeFrameChange = (event, newTimeFrame) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  // Process data for the area chart based on selected time frame
  const processData = () => {
    if (!data || !data.orders || data.orders.length === 0) {
      return [];
    }

    const orders = [...data.orders].sort((a, b) => a.date - b.date);

    // Group by time period
    const groupedData = {};

    orders.forEach((order) => {
      const date = new Date(order.date);
      let period;

      if (timeFrame === "weekly") {
        // Get the week number
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        const weekNumber = Math.ceil(
          (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
        );
        period = `Week ${weekNumber}, ${date.getFullYear()}`;
      } else if (timeFrame === "monthly") {
        // Get month and year
        period = `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`;
      } else if (timeFrame === "quarterly") {
        // Get quarter and year
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        period = `Q${quarter} ${date.getFullYear()}`;
      } else {
        // Yearly
        period = date.getFullYear().toString();
      }

      if (!groupedData[period]) {
        groupedData[period] = {
          period,
          orderCount: 0,
          totalQuantity: 0,
          uniqueColors: new Set(),
        };
      }

      groupedData[period].orderCount++;

      order.colors.forEach((item) => {
        groupedData[period].totalQuantity += item.quantity;
        groupedData[period].uniqueColors.add(item.color);
      });
    });

    // Convert to array and calculate average order size
    return Object.values(groupedData).map((item) => ({
      name: item.period,
      orders: item.orderCount,
      quantity: item.totalQuantity,
      colors: item.uniqueColors.size,
      avgOrderSize:
        Math.round((item.totalQuantity / item.orderCount) * 10) / 10,
    }));
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
        height: "500px",
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
            Order Trends Over Time
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Track orders, quantities, and colors over time
          </Typography>
        </div>

        <ToggleButtonGroup
          value={timeFrame}
          exclusive
          onChange={handleTimeFrameChange}
          size="small"
        >
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="quarterly">Quarterly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#666" }}
            tickLine={false}
            axisLine={true}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#666" }}
            tickLine={false}
            axisLine={true}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#666" }}
            tickLine={false}
            axisLine={true}
          />
          <Tooltip />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="orders"
            name="Number of Orders"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="quantity"
            name="Total Quantity"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="avgOrderSize"
            name="Avg. Order Size"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default OrderTrendsChart;
