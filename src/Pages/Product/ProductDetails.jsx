import { Box, Typography, Tooltip } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ProductDetails = ({ selectedProduct }) => (
  <Box sx={{ mb: 3, border: '1px solid #ddd', p: 2, borderRadius: '4px' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Product Details
    </Typography>
    {selectedProduct ? (
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography>
            <strong>SALE PRICE:</strong> ₹ 111.00
          </Typography>
          <Typography>
            <strong>PURCHASE PRICE:</strong> ₹ 0.00
          </Typography>
        </Box>
        <Box>
          <Typography display="flex" alignItems="center">
            <strong>STOCK QUANTITY:</strong> {selectedProduct.quantity}{' '}
            {selectedProduct.quantity === 0 && (
              <Tooltip title="Low Stock">
                <WarningIcon fontSize="small" color="error" sx={{ ml: 1 }} />
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
);

export default ProductDetails;
