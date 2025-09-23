import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { products, setFilteredData, isAuthenticated, logout } = useContext(AppContext);

  // Search handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/search/${searchTerm.trim()}`);
      setSearchItem("");
    }
  };

  return (
    <div className="nav p-4 bg-black sticky top-0 z-50">
      <div className="nav_bar flex justify-between items-center ml-20">
        {/* Logo */}
        <Link to="/" className="left">
          <h3 className="font-bold text-white text-xl">Electronic Gadgets</h3>
        </Link>

        {/* Search Bar */}
        <form className="search_bar flex-1 ml-72" onSubmit={submitHandler}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchItem(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-[700px] bg-white text-center rounded text-black px-4 py-2 font-semibold"
          />
        </form>

        {/* Action Buttons */}
        <div className="right flex gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className="btn px-4 py-2 bg-black text-white rounded hover:bg-zinc-600"
              >
                Cart
              </Link>
              <Link
                to="/profile"
                className="btn px-4 py-2 bg-black text-white rounded hover:bg-zinc-600"
              >
                Profile
              </Link>
              <button
                onClick={logout} // ✅ Use logout from context
                className="btn px-4 py-2 text-white rounded hover:bg-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn px-4 py-2 text-white rounded hover:bg-zinc-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn px-4 py-2 text-white rounded hover:bg-zinc-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
