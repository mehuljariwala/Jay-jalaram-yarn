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
  Legend,
} from "recharts";

const CustomerOrdersChart = ({ data }) => {
  // Process data for the chart
  const processData = () => {
    if (!data || !data.orders || data.orders.length === 0) {
      return [];
    }

    // Count orders by customer
    const customerOrders = {};
    const customerQuantities = {};

    data.orders.forEach((order) => {
      if (customerOrders[order.customer]) {
        customerOrders[order.customer]++;
        customerQuantities[order.customer] += order.totalQuantity;
      } else {
        customerOrders[order.customer] = 1;
        customerQuantities[order.customer] = order.totalQuantity;
      }
    });

    // Convert to array format for the chart
    return Object.keys(customerOrders)
      .map((customer) => ({
        name: customer,
        orders: customerOrders[customer],
        quantity: customerQuantities[customer],
        avgOrderSize:
          Math.round(
            (customerQuantities[customer] / customerOrders[customer]) * 10
          ) / 10,
      }))
      .sort((a, b) => b.orders - a.orders) // Sort by order count
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
        Top Customers by Order Frequency
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Number of orders and average order size by customer
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
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
            height={60}
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
          <Bar
            yAxisId="left"
            dataKey="orders"
            name="Number of Orders"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="avgOrderSize"
            name="Avg. Order Size"
            fill="#82ca9d"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CustomerOrdersChart;
