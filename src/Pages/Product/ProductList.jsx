import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import ActionMenu from './ActionMenu';

const ProductList = ({ products, handleProductClick, handleAction }) => (
  <List>
    {products.map((product) => (
      <ListItem
        key={product.id}
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
        <ActionMenu product={product} handleAction={handleAction} />
      </ListItem>
    ))}
  </List>
);

export default ProductList;
