import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./Components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/product/ProductDetail";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/products/:id" element={<ProductDetail/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
