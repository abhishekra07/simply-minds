import React from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TransactionTable = ({
  transactions,
  filteredTransactions,
  handleSort,
  handleGeneratePdf,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => (
  <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Typography variant="h6">Transactions</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <TextField size="small" placeholder="Search transactions..." />
        <IconButton onClick={handleGeneratePdf} title="Generate PDF">
          <PictureAsPdfIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
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
                  <ArrowUpwardIcon fontSize="small" />
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction) => (
              <TableRow key={transaction.id} sx={{ cursor: 'pointer' }}>
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
  </>
);

export default TransactionTable;
