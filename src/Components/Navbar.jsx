import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchItem] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/search/${searchTerm.trim()}`);
    }
    setSearchItem("");
  };

  return (
    <div className="nav p-4 bg-orange-300 sticky top-0 z-50">
      <div className="nav_bar flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="left">
          <h3 className="font-bold text-black text-xl">Electronic Gadgets</h3>
        </Link>

        {/* Search Bar */}
        <form className="search_bar flex-1 mx-4" onSubmit={submitHandler}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchItem(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full bg-white text-center rounded text-black px-4 py-2 font-semibold"
          />
        </form>

        {/* Action Buttons */}
        <div className="right flex gap-4">
          <button className="btn px-4 py-2 bg-black text-white rounded hover:bg-zinc-600">
            Cart
          </button>
          <button className="btn px-4 py-2 bg-black text-white rounded hover:bg-zinc-600">
            Profile
          </button>
          <Link
            to="/login"
            className="btn px-4 py-2 bg-yellow-700 text-white rounded hover:bg-zinc-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn px-4 py-2 bg-green-500 text-white rounded hover:bg-zinc-600"
          >
            Register
          </Link>
          <button className="btn px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">
            Logout
          </button>
        </div>

      </div>
      
    </div>
  );
};

export default Navbar;
