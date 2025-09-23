import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
const RelatedProducts = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data.category.toLowerCase() == category.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <>
      <div className="container text-center  ">
        <h1 className="text-3xl font-bold mt-10 ml-82">Related Product</h1>
        <div className="flex flex-wrap justify-center gap-5 p-8 ">
          {relatedProduct.map((product) => (
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

export default RelatedProducts;
