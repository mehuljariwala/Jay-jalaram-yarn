import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TableChartIcon from "@mui/icons-material/TableChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import Header from "../../components/Header/Header";
import YarnDistributionChart from "./components/YarnDistributionChart";
import ColorPopularityChart from "./components/ColorPopularityChart";
import OrderTrendsChart from "./components/OrderTrendsChart";
import CustomerOrdersChart from "./components/CustomerOrdersChart";
import ColorCombinationChart from "./components/ColorCombinationChart";
import SeasonalTrendChart from "./components/SeasonalTrendChart";
import DataTable from "./components/DataTable";
import FilterPanel from "./components/FilterPanel";

const InsightsPage = () => {
  const [, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: "all",
    colorFilter: "all",
    quantityRange: "all",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".mdb")) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError("");
      } else {
        setError("Please upload a valid MDB file");
        setFile(null);
        setFileName("");
      }
    }
  };

  const handleUpload = async () => {
    // For demonstration purposes, we'll allow processing without a file
    // In a real implementation, you would validate the file first

    setLoading(true);
    setError("");

    try {
      // In a real implementation, you would send the file to a server
      // that can parse MDB files or use a library that can parse them
      // For this example, we'll simulate parsing with a timeout and sample data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sample data structure that would come from parsing the MDB file
      const sampleData = generateSampleData();
      setData(sampleData);
    } catch (err) {
      console.error("Error processing file:", err);
      setError("Error processing file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Function to generate sample data for demonstration
  const generateSampleData = () => {
    // This would be replaced with actual data from the MDB file
    const colors = [
      "RED",
      "RANI",
      "R-BLUE",
      "GREEN",
      "ORANGE",
      "JAMBALI",
      "MAJENTA",
      "FIROZI",
      "RAMA",
      "GOLDEN",
      "BLACK",
      "MAHROON",
      "GREY",
      "B-CREAM",
      "PINK",
      "C GREEN(PL)",
      "WINE",
      "B-GREEN",
    ];

    const orders = [];
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date();

    // Generate 100 sample orders
    for (let i = 0; i < 100; i++) {
      const orderDate = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );

      const orderColors = [];
      const numColors = Math.floor(Math.random() * 8) + 1; // 1-8 colors per order

      for (let j = 0; j < numColors; j++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const quantity = Math.floor(Math.random() * 10) + 1; // 1-10 quantity

        orderColors.push({
          color: colors[colorIndex],
          quantity,
        });
      }

      orders.push({
        orderId: `ORD-${1000 + i}`,
        date: orderDate,
        customer: `Customer ${i + 1}`,
        colors: orderColors,
        totalQuantity: orderColors.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
      });
    }

    return {
      orders,
      summary: {
        totalOrders: orders.length,
        totalQuantity: orders.reduce(
          (sum, order) =>
            sum + order.colors.reduce((sum, item) => sum + item.quantity, 0),
          0
        ),
        uniqueColors: colors.length,
        averageOrderSize:
          orders.reduce(
            (sum, order) =>
              sum + order.colors.reduce((sum, item) => sum + item.quantity, 0),
            0
          ) / orders.length,
      },
    };
  };

  // Apply filters to the data
  const getFilteredData = () => {
    if (!data) return null;

    let filteredOrders = [...data.orders];

    // Apply date filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      let startDate;

      switch (filters.dateRange) {
        case "last30":
          startDate = new Date(now.setDate(now.getDate() - 30));
          break;
        case "last90":
          startDate = new Date(now.setDate(now.getDate() - 90));
          break;
        case "last180":
          startDate = new Date(now.setDate(now.getDate() - 180));
          break;
        case "lastYear":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filteredOrders = filteredOrders.filter(
          (order) => order.date >= startDate
        );
      }
    }

    // Apply color filter
    if (filters.colorFilter !== "all") {
      filteredOrders = filteredOrders.filter((order) =>
        order.colors.some((item) => item.color === filters.colorFilter)
      );
    }

    // Apply quantity range filter
    if (filters.quantityRange !== "all") {
      let minQuantity, maxQuantity;

      switch (filters.quantityRange) {
        case "small":
          minQuantity = 1;
          maxQuantity = 10;
          break;
        case "medium":
          minQuantity = 11;
          maxQuantity = 30;
          break;
        case "large":
          minQuantity = 31;
          maxQuantity = Infinity;
          break;
        default:
          minQuantity = 0;
          maxQuantity = Infinity;
      }

      filteredOrders = filteredOrders.filter((order) => {
        const totalQty = order.colors.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return totalQty >= minQuantity && totalQty <= maxQuantity;
      });
    }

    // Calculate summary for filtered data
    const summary = {
      totalOrders: filteredOrders.length,
      totalQuantity: filteredOrders.reduce(
        (sum, order) =>
          sum + order.colors.reduce((sum, item) => sum + item.quantity, 0),
        0
      ),
      uniqueColors: new Set(
        filteredOrders.flatMap((order) =>
          order.colors.map((item) => item.color)
        )
      ).size,
      averageOrderSize:
        filteredOrders.length > 0
          ? filteredOrders.reduce(
              (sum, order) =>
                sum +
                order.colors.reduce((sum, item) => sum + item.quantity, 0),
              0
            ) / filteredOrders.length
          : 0,
    };

    return {
      orders: filteredOrders,
      summary,
    };
  };

  const filteredData = getFilteredData();

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Yarn Insights Dashboard
        </Typography>

        {/* File Upload Section */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload MDB File
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Upload your MDB file to generate insights and visualizations.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ mr: 2 }}
            >
              Select File
              <input
                type="file"
                accept=".mdb"
                hidden
                onChange={handleFileChange}
              />
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Process File"}
            </Button>

            {fileName && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {fileName}
              </Typography>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {data && (
          <>
            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              availableColors={data.orders
                .flatMap((order) => order.colors.map((item) => item.color))
                .filter((color, index, self) => self.indexOf(color) === index)}
            />

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {filteredData.summary.totalOrders}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {filteredData.summary.totalQuantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Quantity
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {filteredData.summary.uniqueColors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unique Colors
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {filteredData.summary.averageOrderSize.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Order Size
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Section Tabs */}
            <Paper
              sx={{
                p: 2,
                mb: 4,
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AnalyticsIcon color="primary" />
                  <Typography variant="h6">
                    Comprehensive Yarn Data Analysis
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ width: "100%" }}
                >
                  Explore detailed insights from your MDB file with interactive
                  charts and data visualization
                </Typography>
              </Box>
            </Paper>

            {/* Basic Charts Section */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mt: 4,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AnalyticsIcon fontSize="small" />
              Basic Distribution Analysis
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <YarnDistributionChart data={filteredData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ColorPopularityChart data={filteredData} />
              </Grid>
            </Grid>

            {/* Advanced Charts Section */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mt: 4,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TimelineIcon fontSize="small" />
              Advanced Trend Analysis
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <OrderTrendsChart data={filteredData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomerOrdersChart data={filteredData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ColorCombinationChart data={filteredData} />
              </Grid>
              <Grid item xs={12}>
                <SeasonalTrendChart data={filteredData} />
              </Grid>
            </Grid>

            {/* Data Table Section */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mt: 4,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TableChartIcon fontSize="small" />
              Detailed Data View
            </Typography>
            <DataTable data={filteredData} />
          </>
        )}
      </Container>
    </>
  );
};

export default InsightsPage;
