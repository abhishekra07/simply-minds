import * as React from 'react';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router';

const breadcrumbNameMap = {
  '/home': 'Home',
  '/product': 'Product',
  '/product/add': 'Add',
  '/product/edit': 'Edit',
  '/product/delete': 'Delete',
  '/supplier': 'Supplier',
  '/supplier/add': 'Add',
  '/supplier/edit': 'Edit',
  '/supplier/delete': 'Delete',
  '/category': 'Category',
  '/category/add': 'Add',
  '/category/edit': 'Edit',
  '/category/delete': 'Delete',
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

function Breadcrum() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon fontSize="small" /> Home
        </Typography>
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        return last ? (
          <Typography key={to} sx={{ color: 'text.primary' }}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default Breadcrum;
