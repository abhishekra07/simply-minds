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
  FormControlLabel,
  Switch,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlarmIcon from '@mui/icons-material/Alarm';

const Supplier = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [transactionSearch, setTransactionSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [status, setStatus] = useState('Active');

  const open = Boolean(anchorEl);

  // Dummy supplier list
  const suppliers = [
    {
      id: 1,
      name: 'Supplier A',
      phone: '1234567890',
      email: 'supplierA@email.com',
      creditLimit: '₹50000',
      address: '123 Supplier St, City, Country',
      gstin: 'GSTIN123456789',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Supplier B',
      phone: '9876543210',
      email: 'supplierB@email.com',
      creditLimit: '₹30000',
      address: '456 Supplier Rd, City, Country',
      gstin: 'GSTIN987654321',
      status: 'Inactive',
    },
    // Add more suppliers as needed
  ];

  // Encode the message for use in a URL
  const encodedMessage = encodeURIComponent('Hello From Abhishek to you!!');
  const phoneNumber = '8839705239';
  // WhatsApp URL format: https://wa.me/<phone_number>?text=<message>
  // const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const whatsappLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  // Dummy transaction data for suppliers
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'Purchase',
      amount: '₹1000',
      date: '2025-01-01',
      supplier: 'Supplier A',
    },
    {
      id: 2,
      type: 'Purchase',
      amount: '₹2000',
      date: '2025-01-02',
      supplier: 'Supplier B',
    },
    {
      id: 3,
      type: 'Return',
      amount: '₹500',
      date: '2025-01-03',
      supplier: 'Supplier A',
    },
    {
      id: 4,
      type: 'Purchase',
      amount: '₹1500',
      date: '2025-01-04',
      supplier: 'Supplier C',
    },
    {
      id: 5,
      type: 'Return',
      amount: '₹200',
      date: '2025-01-05',
      supplier: 'Supplier C',
    },
    {
      id: 6,
      type: 'Purchase',
      amount: '₹1200',
      date: '2025-01-06',
      supplier: 'Supplier A',
    },
    {
      id: 7,
      type: 'Purchase',
      amount: '₹3000',
      date: '2025-01-07',
      supplier: 'Supplier B',
    },
    {
      id: 8,
      type: 'Return',
      amount: '₹100',
      date: '2025-01-08',
      supplier: 'Supplier A',
    },
  ]);

  // Handlers
  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
    setStatus(supplier.status); // Set initial status to selected supplier's status
  };

  const handleMenuClick = (event, supplier) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      transaction.supplier
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

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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
              placeholder="Search supplier..."
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
                Add Supplier
              </Button>
            </>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {suppliers.map((supplier) => (
            <ListItem
              key={supplier.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(event) => handleMenuClick(event, supplier)}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              button
              onClick={() => handleSupplierClick(supplier)}
            >
              <ListItemText
                primary={supplier.name}
                secondary={`Contact: ${supplier.phone}`}
                primaryTypographyProps={{
                  color: supplier.status === 'Inactive' ? 'error' : 'inherit',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Content */}
      <Box sx={{ flex: 1, p: 2 }}>
        {/* Supplier Details */}
        <Box
          sx={{ mb: 3, border: '1px solid #ddd', p: 2, borderRadius: '4px' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Typography variant="h6">
              {selectedSupplier ? selectedSupplier.name : 'Select a supplier'}
            </Typography>

            {/* Icons for actions */}
            <Box display="flex" alignItems="center">
              <Tooltip title="Send Payment Reminder SMS to party" arrow>
                <IconButton>
                  <MessageIcon fontSize="medium" sx={{ color: '#eb8f0e' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send Payment Reminder WhatsApp to party" arrow>
                <IconButton>
                  <WhatsAppIcon
                    fontSize="medium"
                    sx={{ color: '#06bd06' }}
                    onClick={() => window.open(whatsappLink, '_blank')}
                  />
                </IconButton>
              </Tooltip>
              <IconButton title="Send Email">
                <EmailIcon color="primary" />
              </IconButton>
              <Tooltip title="Set Reminder" arrow>
                <IconButton>
                  <AlarmIcon fontSize="medium" sx={{ color: '#e3280b' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {selectedSupplier ? (
            <Box display="flex" justifyContent="space-between">
              {/* Left Section */}
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    Phone:
                  </Typography>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <Typography>{selectedSupplier.phone}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    Email:
                  </Typography>
                  <EmailIcon sx={{ mr: 1 }} />
                  <Typography>{selectedSupplier.email}</Typography>
                </Box>
                {selectedSupplier.creditLimit && (
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                      Credit Limit:
                    </Typography>
                    <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                    <Typography>{selectedSupplier.creditLimit}</Typography>
                  </Box>
                )}
              </Box>

              {/* Right Section */}
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    Address:
                  </Typography>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography>{selectedSupplier.address}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    GSTIN:
                  </Typography>
                  <Typography>{selectedSupplier.gstin}</Typography>
                </Box>
                {/* Party Status */}
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    Party Status:
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status === 'Active'}
                        onChange={handleStatusChange}
                        name="status"
                      />
                    }
                    label={status === 'Active' ? 'Active' : 'Inactive'}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography>Select a supplier to view details</Typography>
          )}
        </Box>

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
        {/* Transactions Table*/}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Tooltip title="Sort by Date">
                    <IconButton onClick={() => handleSort('date')}>
                      {sortConfig.direction === 'asc' ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  Date
                </TableCell>
                <TableCell>Type</TableCell>
                <TableCell>
                  <Tooltip title="Sort by Amount">
                    <IconButton onClick={() => handleSort('amount')}>
                      {sortConfig.direction === 'asc' ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => alert('Edit Supplier')}>Edit</MenuItem>
        <MenuItem onClick={() => alert('Delete Supplier')}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default Supplier;
