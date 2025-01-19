import React from 'react';
import { Box, Divider, Grid2 } from '@mui/material';
import {
  Person,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import MetricCard from '../components/Card/MetricCard';
import RecentOrders from './RecentOrders';

function Home() {
  return (
    <>
      <Grid2 container spacing={2} justifyContent="center">
        {/* Active Users Card */}
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Users"
            value="1,245"
            icon={Person}
            bgColor="#007FFF" // Custom background color
            iconColor="#0066CC" // Custom icon color
            hoverBgColor="#0059B3" // Custom hover background color
            hoverIconColor="#004D99" // Custom hover icon color
          />
        </Grid2>

        {/* Purchase Orders Card */}
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricCard
            title="Purchase Orders"
            value="320"
            icon={ShoppingCart}
            bgColor="#28a745" // Custom background color
            iconColor="#218838" // Custom icon color
            hoverBgColor="#1e7e34" // Custom hover background color
            hoverIconColor="#155d27" // Custom hover icon color
          />
        </Grid2>

        {/* Sales Orders Card */}
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricCard
            title="Sales Orders"
            value="785"
            icon={TrendingUp}
            bgColor="#ffc107" // Custom background color
            iconColor="#e0a800" // Custom icon color
            hoverBgColor="#d39e00" // Custom hover background color
            hoverIconColor="#c69500" // Custom hover icon color
          />
        </Grid2>

        {/* Profit/Loss Card */}
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricCard
            title="Profit/Loss"
            value="-$150"
            icon={TrendingDown}
            bgColor="#dc3545" // Custom background color
            iconColor="#c82333" // Custom icon color
            hoverBgColor="#bd2130" // Custom hover background color
            hoverIconColor="#9f1c24" // Custom hover icon color
          />
        </Grid2>
      </Grid2>
      <Box sx={{ marginTop: 5 }}>
        {/* Divider to separate sections */}
        <Divider sx={{ marginBottom: 2 }} />
        {/* Recent Orders Section */}
        <RecentOrders /> {/* Use the RecentOrders component here */}
      </Box>
    </>
  );
}

export default Home;
