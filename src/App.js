import { BrowserRouter, Routes, Route } from 'react-router';
import { Box, Divider } from '@mui/material';

import Home from './Pages/Home';
import Product from './Pages/Product/Product';
import Supplier from './Pages/Supplier';
import Category from './Pages/Category';
import Sidenav from './components/Sidebar/Sidenav';
import './App.css';
import Breadcrum from './components/Breadcrums/Breadcrum';
import SidebarManager from './Features/POC/SidebarManager';

function App() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <BrowserRouter>
          <Sidenav />
          <Box sx={{ flexGrow: 1, p: 4, marginTop: 7 }}>
            <Breadcrum />
            <Divider
              sx={{ marginTop: 1, marginBottom: 1, borderBottomWidth: 2 }}
            />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/home" exact element={<Home />} />
              <Route path="/product" exact element={<Product />} />
              <Route path="/product/add" exact element={<Product />} />
              <Route path="/product/edit" exact element={<Product />} />
              <Route path="/product/delete" exact element={<Product />} />
              <Route path="/supplier" exact element={<Supplier />} />
              <Route path="/supplier/add" exact element={<Supplier />} />
              <Route path="/supplier/edit" exact element={<Supplier />} />
              <Route path="/supplier/delete" exact element={<Supplier />} />
              <Route path="/category" exact element={<Category />} />
              <Route path="/category/add" exact element={<Category />} />
              <Route path="/category/edit" exact element={<Category />} />
              <Route path="/category/delete" exact element={<Category />} />
              <Route path="/sidebar/poc" exact element={<SidebarManager />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
