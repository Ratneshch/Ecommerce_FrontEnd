import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import BannerPage from "../../BannerPage";

const ShowProduct = () => {
  const {
    products,
    filteredData,
    setFilteredData,
    addToCart,
    isAuthenticated,
    cart,
  } = useContext(AppContext);

  const [activeCategory, setActiveCategory] = useState("All");

  // Filter by category
  const filterByCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredData(products);
    } else {
      setFilteredData(
        products.filter(
          (product) => product.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  };

  // Initialize filteredData
  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  // Helper: Get current quantity of a product in cart
  const getCartQuantity = (productID) => {
    const item = cart.find((c) => c.product_id === productID);
    return item ? item.quantity : 0;
  };

  if (!filteredData.length) {
    return <p className="text-center mt-4">No products found...</p>;
  }

  return (
    <>
      {/* Banner full screen */}
      <div className="h-screen w-full">
        <BannerPage />
      </div>

      {/* Filter Navbar */}
      <div className="sticky top-16 z-40 bg-blue-400 text-white flex justify-center gap-4 px-10 py-2 shadow-md">
        {["All", "Bags", "Electronics", "Wearables", "Furniture", "Fashion"].map(
          (cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded ${
                activeCategory === cat ? "bg-blue-600 font-bold" : "hover:bg-blue-500"
              }`}
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Products Grid */}
      <div className="min-h-screen flex flex-wrap justify-center gap-5 p-8">
        {filteredData.map((product) => {
          const qtyInCart = getCartQuantity(product.id);

          return (
            <div
              className="w-[200px] h-[275px] border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              key={product.id}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-full h-[150px] object-contain bg-gray-100"
                />
              </Link>
              <div className="p-3">
                <h1 className="text-md text-center font-semibold">{product.title}</h1>
                <h3 className="text-xs text-center text-gray-600">{product.description}</h3>
              </div>
              <div className="text-center pb-3">
                <button className="py-1 px-3 bg-blue-700 rounded text-white mr-2 text-xs">
                  ₹{product.price}
                </button>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert("Please login first!");
                      return;
                    }
                    addToCart(product.id, 1); // always add 1
                  }}
                  className="py-1 px-3 bg-yellow-400 rounded text-black text-xs"
                >
                  {qtyInCart > 0
                    ? `Add to Cart (${qtyInCart})`
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowProduct;
