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
  TableSortLabel,
  Paper,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchItemsText, setSearchItemsText] = useState('');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [transactionSearch, setTransactionSearch] = useState('');

  // Dummy category data
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      totalItems: 10,
      items: [
        { id: 1, name: 'Laptop', quantity: 20, stockValue: 50000 },
        { id: 2, name: 'Mobile Phone', quantity: 50, stockValue: 20000 },
        { id: 3, name: 'Smartwatch', quantity: 15, stockValue: 10000 },
        // Add more items as needed
      ],
    },
    {
      id: 2,
      name: 'Furniture',
      totalItems: 8,
      items: [
        { id: 1, name: 'Chair', quantity: 100, stockValue: 3000 },
        { id: 2, name: 'Table', quantity: 50, stockValue: 8000 },
        { id: 3, name: 'Sofa', quantity: 20, stockValue: 15000 },
        // Add more items as needed
      ],
    },
    // Add more categories as needed
  ];

  // Sorting handler
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortItems = (items) => {
    return items.sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (orderBy === 'quantity') {
        return order === 'asc'
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      } else if (orderBy === 'stockValue') {
        return order === 'asc'
          ? a.stockValue - b.stockValue
          : b.stockValue - a.stockValue;
      }
      return 0;
    });
  };

  const filterItems = (items) => {
    if (!searchItemsText) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchItemsText.toLowerCase()),
    );
  };

  // Handlers
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleMenuClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenuCategory(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMenuCategory(null);
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

  const handleSearchItemsChange = (e) => {
    setSearchItemsText(e.target.value);
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
              placeholder="Search category..."
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
                Add Category
              </Button>
            </>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(event) => handleMenuClick(event, category)}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              button
              onClick={() => handleCategoryClick(category)}
            >
              <ListItemText
                primary={category.name}
                secondary={`Total Items: ${category.totalItems}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Content */}
      <Box sx={{ flex: 1, p: 2 }}>
        {/* Category Details */}
        <Box
          sx={{ mb: 3, border: '1px solid #ddd', p: 2, borderRadius: '4px' }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedCategory ? selectedCategory.name : 'Select a category'}
          </Typography>
          {selectedCategory ? (
            <Box display="flex" justifyContent="space-between">
              {/* Left Section */}
              <Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    Category Name:
                  </Typography>
                  <Typography>{selectedCategory.name}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                    Total Items:
                  </Typography>
                  <Typography>{selectedCategory.totalItems}</Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography>Select a category to view details</Typography>
          )}
        </Box>

        {/* Transactions Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">
            Items in {selectedCategory ? selectedCategory.name : 'Category'}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              size="small"
              placeholder="Search transactions..."
              value={transactionSearch}
              onChange={handleTransactionSearch}
            />
          </Box>
        </Box>

        {/* Items Table */}
        {selectedCategory && selectedCategory.items && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'quantity'}
                      direction={orderBy === 'quantity' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'quantity')}
                    >
                      Quantity
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'stockValue'}
                      direction={orderBy === 'stockValue' ? order : 'asc'}
                      onClick={(event) =>
                        handleRequestSort(event, 'stockValue')
                      }
                    >
                      Stock Value
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortItems(filterItems(selectedCategory.items)).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.stockValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default Category;
