import React, { useState } from 'react';
import {
  Modal,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';
import { FaFilter } from 'react-icons/fa';

// Sample dataset
const data = [
  { id: 1, name: 'Product 1', category: 'Category 1', price: 30 },
  { id: 2, name: 'Product 2', category: 'Category 2', price: 75 },
  { id: 3, name: 'Product 3', category: 'Category 1', price: 120 },
  { id: 4, name: 'Product 4', category: 'Category 3', price: 50 },
  { id: 5, name: 'Product 5', category: 'Category 2', price: 95 },
  { id: 6, name: 'Product 6', category: 'Category 3', price: 200 },
  { id: 7, name: 'Product 7', category: 'Category 1', price: 40 },
  { id: 8, name: 'Product 8', category: 'Category 2', price: 85 },
  { id: 9, name: 'Product 9', category: 'Category 1', price: 60 },
  { id: 10, name: 'Product 10', category: 'Category 3', price: 150 },
];

// Filter configuration
const filterConfig = [
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: ['Category 1', 'Category 2', 'Category 3'],
  },
  {
    name: 'priceRange',
    label: 'Price Range',
    type: 'select',
    options: ['Under $50', '$50-$100', 'Above $100'],
  },
  { name: 'search', label: 'Search', type: 'text' },
];

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// Utility function to sort the data
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
// Main FilterComponent that renders the filter modal and applies filters dynamically
const FilterComponent = ({ filterConfig, onApplyFilters }) => {
  const [filters, setFilters] = useState({}); // Holds the applied filters
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Open and close modal
  const toggleModal = () => setShowModal(!showModal);

  // Handle changes in filter input
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // Apply filters and close modal
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    toggleModal();
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setFilters({});
    onApplyFilters({});
  };

  // Render filter labels
  const renderFilterLabels = () => {
    return Object.keys(filters).map((key) => (
      <Chip
        key={key}
        label={`${key}: ${filters[key]}`}
        onDelete={() => {
          const updatedFilters = { ...filters };
          delete updatedFilters[key];
          setFilters(updatedFilters);
          onApplyFilters(updatedFilters);
        }}
        color="primary"
        sx={{ margin: 0.5 }}
      />
    ));
  };

  // Render the modal content dynamically based on the filter configuration
  const renderFilterModalContent = () => {
    return filterConfig.map((filter) => (
      <Box key={filter.name} sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel>{filter.label}</InputLabel>
          {filter.type === 'text' && (
            <TextField
              type="text"
              placeholder={`Enter ${filter.label}`}
              value={filters[filter.name] || ''}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            />
          )}
          {filter.type === 'select' && (
            <Select
              value={filters[filter.name] || ''}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              label={filter.label}
            >
              <MenuItem value="">Select {filter.label}</MenuItem>
              {filter.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </Box>
    ));
  };

  // Render the filter icon button
  const renderFilterIcon = () => (
    <IconButton onClick={toggleModal} color="primary">
      <FaFilter size={20} />
    </IconButton>
  );

  // Render the "Reset Filters" button and handle its state
  const renderResetFiltersButton = () => (
    <Button
      variant="outlined"
      onClick={handleClearAllFilters}
      disabled={Object.keys(filters).length === 0}
      color="secondary"
    >
      Reset Filters
    </Button>
  );

  return (
    <div>
      {/* Filters and button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        {renderFilterIcon()}
        {renderResetFiltersButton()}
      </div>

      {/* Applied Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderFilterLabels()}
      </div>

      {/* Modal */}
      <Modal open={showModal} onClose={toggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 2,
            boxShadow: 24,
            borderRadius: 2,
            width: '400px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <h3>Apply Filters</h3>
            <IconButton onClick={toggleModal} color="primary">
              &times;
            </IconButton>
          </div>

          <div>{renderFilterModalContent()}</div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={toggleModal}
              color="secondary"
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button onClick={handleApplyFilters} color="primary">
              Apply Filters
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

// Dashboard Component (where the FilterComponent will be used)
const ProductDashboard = () => {
  const [filteredData, setFilteredData] = useState(data); // Assume 'data' is your original dataset
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filters, setFilters] = useState({});

  // Handle filter application
  const handleApplyFilters = (appliedFilters) => {
    let newFilteredData = data;

    // Apply filters
    if (appliedFilters.category) {
      newFilteredData = newFilteredData.filter(
        (item) => item.category === appliedFilters.category,
      );
    }
    if (appliedFilters.priceRange) {
      if (appliedFilters.priceRange === 'Under $50')
        newFilteredData = newFilteredData.filter((item) => item.price < 50);
      if (appliedFilters.priceRange === '$50-$100')
        newFilteredData = newFilteredData.filter(
          (item) => item.price >= 50 && item.price <= 100,
        );
      if (appliedFilters.priceRange === 'Above $100')
        newFilteredData = newFilteredData.filter((item) => item.price > 100);
    }
    if (appliedFilters.search) {
      newFilteredData = newFilteredData.filter((item) =>
        item.name.toLowerCase().includes(appliedFilters.search.toLowerCase()),
      );
    }
    console.log(`newFilteredData ${JSON.stringify(newFilteredData)}`);
    setFilters(appliedFilters);
    setFilteredData(newFilteredData);
  };

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div>
      <FilterComponent
        filterConfig={filterConfig}
        onApplyFilters={handleApplyFilters}
      />
      {/* Data Table : Render filtered data here */}
      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Product Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={() => handleRequestSort('category')}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleRequestSort('price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredData, getComparator(order, orderBy)).map(
              (row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.price}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductDashboard;
