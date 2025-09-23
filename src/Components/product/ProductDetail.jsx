import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "./RelatedProducts.jsx";
import AppContext from "../../context/AppContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const url = "http://localhost:3000/api";
  const { id } = useParams();
  const { addToCart } = useContext(AppContext); // ✅ get addToCart from context

  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-4">Loading product...</p>;
  }

  return (
   <>
    {/* Toast container for notifications */}
    <ToastContainer position="top-right" autoClose={1500} theme="dark" />

    <div className="flex justify-center items-center pt-66 -mt-52">
      <div className="flex flex-col md:flex-row items-center gap-8 border rounded-lg p-6 shadow-lg max-w-3xl">
        
        <div className="left">
          <img
            src={product.imgSrc}
            alt={product.title}
            className="w-[250px] h-[250px] object-contain"
          />
        </div>

        <div className="right text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <h2 className="text-2xl font-semibold mb-4">₹{product.price}</h2>
          <div className="btn flex justify-center md:justify-start gap-4">
            <button className="px-4 py-2 bg-red-400 rounded-2xl hover:bg-red-500 transition">
              Buy Now
            </button>
            <button
              onClick={() => addToCart(product.id, 1)} // ✅ add product to cart
              className="px-4 py-2 bg-amber-400 rounded-2xl hover:bg-amber-500 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
    <RelatedProducts category={product?.category} />
   </>
  );
};

export default ProductDetail;
