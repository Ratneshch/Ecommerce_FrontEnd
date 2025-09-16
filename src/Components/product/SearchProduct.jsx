import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link,useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);

const {term}=useParams()

  useEffect(() => {
    setSearchProduct(
      products.filter(
        (data) => data?.title?.toLowerCase().includes(term.toLowerCase()))
    );
  }, [term, products]);

  return (
    <>
      <div className="container text-center ">
        <div className="flex flex-wrap justify-center gap-5 p-8">
          {searchProduct.map((product) => (
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
                <h1 className="text-md text-center font-semibold">
                  {product.title}
                </h1>
                <h3 className="text-xs text-center text-gray-600">
                  {product.description}
                </h3>
              </div>
              <div className="text-center pb-3">
                <button className="py-1 px-3 bg-blue-700 rounded text-white mr-2 text-xs">
                  ₹{product.price}
                </button>
                <button className="py-1 px-3 bg-yellow-400 rounded text-black text-xs">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
