import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Tooltip,
  TablePagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [selectedMenuProduct, setSelectedMenuProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const [page, setPage] = useState(0); // Page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  const open = Boolean(anchorEl);

  // Dummy product list
  const products = [
    {
      id: 1,
      name: 'Product A',
      quantity: 10,
      details: 'Details for Product A',
    },
    { id: 2, name: 'Product B', quantity: 0, details: 'Details for Product B' },
    { id: 3, name: 'Product C', quantity: 5, details: 'Details for Product C' },
  ];

  // Dummy transaction data
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Purchase', amount: '₹100', date: '2025-01-01' },
    { id: 2, type: 'Sell', amount: '₹150', date: '2025-01-02' },
    { id: 3, type: 'Purchase', amount: '₹200', date: '2025-01-03' },
    { id: 4, type: 'Sell', amount: '₹300', date: '2025-01-04' },
    { id: 5, type: 'Purchase', amount: '₹250', date: '2025-01-05' },
    { id: 6, type: 'Sell', amount: '₹400', date: '2025-01-06' },
    { id: 7, type: 'Purchase', amount: '₹500', date: '2025-01-07' },
    { id: 8, type: 'Sell', amount: '₹600', date: '2025-01-08' },
  ]);

  // Handlers
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenuProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMenuProduct(null);
  };

  const handleSearchMode = () => {
    setSearchMode(true);
  };

  const handleSearchBlur = () => {
    setSearchMode(false);
    setSearchText('');
  };

  const handleTransactionSearch = (event) => {
    setTransactionSearch(event.target.value);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedData = [...transactions].sort((a, b) => {
      if (key === 'amount') {
        const amountA = parseFloat(a.amount.replace('₹', ''));
        const amountB = parseFloat(b.amount.replace('₹', ''));
        return direction === 'asc' ? amountA - amountB : amountB - amountA;
      }

      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setTransactions(sortedData);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type
        .toLowerCase()
        .includes(transactionSearch.toLowerCase()) ||
      transaction.amount
        .toLowerCase()
        .includes(transactionSearch.toLowerCase()) ||
      transaction.date.toLowerCase().includes(transactionSearch.toLowerCase()),
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };

  const handleGeneratePdf = () => {
    alert('PDF generation logic goes here!');
    // Add your PDF generation and download logic here.
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        sx={{
          width: '25%',
          borderRight: '1px solid #ddd',
          p: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          {searchMode ? (
            <TextField
              fullWidth
              size="small"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={handleSearchBlur}
              autoFocus
              placeholder="Search product..."
            />
          ) : (
            <>
              <IconButton onClick={handleSearchMode} sx={{ mr: 1 }}>
                <SearchIcon />
              </IconButton>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                fullWidth
              >
                Add Item
              </Button>
            </>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {products.map((product) => (
            <ListItem
              key={product.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(event) => handleMenuClick(event, product)}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              button
              onClick={() => handleProductClick(product)}
            >
              <ListItemText
                primary={product.name}
                secondary={`Quantity: ${product.quantity}`}
                primaryTypographyProps={{
                  color: product.quantity === 0 ? 'error' : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Content */}
      <Box sx={{ flex: 1, p: 2 }}>
        {/* Product Details */}
        <Box
          sx={{ mb: 3, border: '1px solid #ddd', p: 2, borderRadius: '4px' }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Product Details
          </Typography>
          {selectedProduct ? (
            <Box display="flex" justifyContent="space-between">
              {/* Left Section */}
              <Box>
                <Typography>
                  <strong>SALE PRICE:</strong> ₹ 111.00
                </Typography>
                <Typography>
                  <strong>PURCHASE PRICE:</strong> ₹ 0.00
                </Typography>
              </Box>

              {/* Right Section */}
              <Box>
                <Typography display="flex" alignItems="center">
                  <strong>STOCK QUANTITY:</strong> {selectedProduct.quantity}{' '}
                  {selectedProduct.quantity === 0 && (
                    <Tooltip title="Low Stock">
                      <WarningIcon
                        fontSize="small"
                        color="error"
                        sx={{ ml: 1 }}
                      />
                    </Tooltip>
                  )}
                </Typography>
                <Typography>
                  <strong>STOCK VALUE:</strong> ₹ 0.00
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography color="text.secondary">
              Select a product to view details.
            </Typography>
          )}
        </Box>
        <Divider sx={{ mb: 3 }} />

        {/* Transactions Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">Transactions</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              size="small"
              placeholder="Search transactions..."
              value={transactionSearch}
              onChange={handleTransactionSearch}
            />
            <IconButton onClick={handleGeneratePdf} title="Generate PDF">
              <PictureAsPdfIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
        {/* Transaction Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['id', 'type', 'amount', 'date'].map((key) => (
                  <TableCell key={key}>
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => handleSort(key)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {key.toUpperCase()}
                      {sortConfig.key === key &&
                        (sortConfig.direction === 'asc' ? (
                          <ArrowUpwardIcon fontSize="small" />
                        ) : (
                          <ArrowDownwardIcon fontSize="small" />
                        ))}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      backgroundColor:
                        transaction.type.toLowerCase() === 'sell'
                          ? 'rgba(194, 16, 18, 0.4)'
                          : transaction.type.toLowerCase() === 'purchase'
                          ? 'rgba(0, 253, 0, 0.3)'
                          : 'inherit',
                      '&:hover': {
                        backgroundColor:
                          transaction.type.toLowerCase() === 'sell'
                            ? 'rgba(248, 23, 23, 0.5)'
                            : transaction.type.toLowerCase() === 'purchase'
                            ? 'rgba(33, 243, 5, 0.4)'
                            : 'rgba(0, 0, 0, 0.04)', // Default hover color for neutral rows
                      },
                      cursor: 'pointer', // Changes cursor to pointer for better UX
                    }}
                  >
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onClick={() => {
            alert(`Viewing ${selectedMenuProduct?.name}`);
            handleMenuClose();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert(`Editing ${selectedMenuProduct?.name}`);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert(`Deleting ${selectedMenuProduct?.name}`);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Product;
