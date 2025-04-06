import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

const SeasonalTrendChart = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxColors] = useState(5);

  // Get all unique colors from the data
  const uniqueColors =
    data && data.orders
      ? [
          ...new Set(
            data.orders.flatMap((order) => order.colors.map((c) => c.color))
          ),
        ]
      : [];

  const handleTimeFrameChange = (event, newTimeFrame) => {
    if (newTimeFrame !== null) {
      setTimeFrame(newTimeFrame);
    }
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setSelectedColors(typeof value === "string" ? value.split(",") : value);
  };

  // Process data for the line chart
  const processData = () => {
    if (!data || !data.orders || data.orders.length === 0) {
      return [];
    }

    const orders = [...data.orders].sort((a, b) => a.date - b.date);

    // Group by time period
    const colorsByPeriod = {};

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

      if (!colorsByPeriod[period]) {
        colorsByPeriod[period] = {};
      }

      order.colors.forEach((item) => {
        if (colorsByPeriod[period][item.color]) {
          colorsByPeriod[period][item.color] += item.quantity;
        } else {
          colorsByPeriod[period][item.color] = item.quantity;
        }
      });
    });

    // Convert to array format for the line chart
    const periods = Object.keys(colorsByPeriod);
    periods.sort((a, b) => {
      // Sort by year first
      const yearA = a.split(" ").pop();
      const yearB = b.split(" ").pop();

      if (yearA !== yearB) {
        return yearA - yearB;
      }

      // Then sort by period within the year
      if (timeFrame === "weekly") {
        return (
          a.split(" ")[1].replace(",", "") - b.split(" ")[1].replace(",", "")
        );
      } else if (timeFrame === "monthly") {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return (
          months.indexOf(a.split(" ")[0]) - months.indexOf(b.split(" ")[0])
        );
      } else if (timeFrame === "quarterly") {
        return a.charAt(1) - b.charAt(1);
      }

      return 0;
    });

    return periods.map((period) => {
      const periodData = { name: period };

      // Add data for each color
      Object.keys(colorsByPeriod[period]).forEach((color) => {
        periodData[color] = colorsByPeriod[period][color];
      });

      return periodData;
    });
  };

  const chartData = processData();

  // Determine which colors to show in the chart
  const getTopColors = () => {
    if (selectedColors.length > 0) {
      return selectedColors;
    }

    // If no colors are selected, show the top N most frequent colors
    const colorTotals = {};

    chartData.forEach((period) => {
      Object.keys(period).forEach((key) => {
        if (key !== "name") {
          if (colorTotals[key]) {
            colorTotals[key] += period[key];
          } else {
            colorTotals[key] = period[key];
          }
        }
      });
    });

    return Object.keys(colorTotals)
      .sort((a, b) => colorTotals[b] - colorTotals[a])
      .slice(0, maxColors);
  };

  const topColors = getTopColors();

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
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            Seasonal Color Trends
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Track color popularity over time
          </Typography>
        </div>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <ToggleButtonGroup
            value={timeFrame}
            exclusive
            onChange={handleTimeFrameChange}
            size="small"
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="quarterly">Quarterly</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>

          <FormControl size="small" sx={{ minWidth: "200px" }}>
            <InputLabel id="color-select-label">Colors</InputLabel>
            <Select
              labelId="color-select-label"
              multiple
              value={selectedColors}
              label="Colors"
              onChange={handleColorChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {uniqueColors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            tick={{ fill: "#666" }}
            tickLine={false}
            axisLine={true}
            label={{
              value: "Quantity",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip />
          <Legend />
          {topColors.map((color, index) => (
            <Line
              key={color}
              type="monotone"
              dataKey={color}
              name={color}
              stroke={COLORS[index % COLORS.length]}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SeasonalTrendChart;
