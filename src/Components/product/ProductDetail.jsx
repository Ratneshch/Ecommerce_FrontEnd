import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "./RelatedProducts.jsx";
import AppContext from "../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const url = "http://localhost:3000/api";
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${url}/products/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-4">Loading product...</p>;
  }

  // Direct purchase: Buy Now
  const handleBuyNow = () => {
    navigate("/checkout", { state: { directProduct: product } });
  };

  // Add to global cart
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    toast.success("Added to cart!");
  };

  return (
    <>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />

      <div className="flex justify-center items-center pt-66 -mt-52">
        <div className="flex flex-col md:flex-row items-center gap-8 border rounded-lg p-6 shadow-lg max-w-3xl">
          {/* Product Image */}
          <div className="left">
            <img
              src={product.imgSrc}
              alt={product.title}
              className="w-[250px] h-[250px] object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="right text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="mb-4 text-gray-700">{product.description}</p>
            <h2 className="text-2xl font-semibold mb-4">₹{product.price}</h2>

            <div className="btn flex justify-center md:justify-start gap-4">
              <button
                onClick={handleBuyNow}
                className="px-4 py-2 bg-red-400 rounded-2xl hover:bg-red-500 transition"
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-amber-400 rounded-2xl hover:bg-amber-500 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={product?.category} />
    </>
  );
};

export default ProductDetail;
