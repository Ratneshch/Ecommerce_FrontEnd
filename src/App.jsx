import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./Components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/product/ProductDetail";
import Navbar from "./Components/Navbar";
import SearchProduct from "./Components/product/searchProduct";
import Register from "./Components/user/Register";
 import { ToastContainer, toast } from 'react-toastify';
import Login from "./Components/user/Login";
import Profile from "./Components/user/Profile";
import ProductCart from "./Components/product/ProductCart";

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/products/:id" element={<ProductDetail/>}/>
           <Route path="/products/search/:term" element={<SearchProduct/>}/>
           <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="/cart" element={<ProductCart/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
