import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

// Simulated recent orders data
const recentOrdersData = [
  {
    orderId: 'ORD123',
    productName: 'Product A',
    quantity: 3,
    price: '$45.00',
    status: 'Delivered',
  },
  {
    orderId: 'ORD124',
    productName: 'Product B',
    quantity: 2,
    price: '$60.00',
    status: 'Shipped',
  },
  {
    orderId: 'ORD125',
    productName: 'Product C',
    quantity: 1,
    price: '$30.00',
    status: 'Pending',
  },
];

const RecentOrders = () => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>

      {recentOrdersData.length === 0 ? (
        <Typography>No data available</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="recent orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrdersData.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell component="th" scope="row">
                    {order.orderId}
                  </TableCell>
                  <TableCell align="left">{order.productName}</TableCell>
                  <TableCell align="left">{order.quantity}</TableCell>
                  <TableCell align="left">{order.price}</TableCell>
                  <TableCell align="left">{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default RecentOrders;
