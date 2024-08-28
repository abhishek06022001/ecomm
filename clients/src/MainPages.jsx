import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Product from './Product/Product';
import Login from './Login/Login';
import Register from './Register/Register';
import DetailProduct from './DetailProduct/DetailProduct';
import PrivateRoute from './routes/PrivateRoute';
function MainPages() {
  return (
    <>
      <div style={{ marginTop: '4rem' }} >
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/detail/:id" element={<PrivateRoute element={DetailProduct} />} /></Routes>
          
      </div>
    </>
  )
}
export default MainPages