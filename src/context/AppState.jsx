import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = ({ children }) => {
  const url = "http://localhost:3000/api";

  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);

  // Cart
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${url}/products/all`);
        setProducts(res.data);
        setFilteredData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch profile & cart
  useEffect(() => {
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || res.data);
        setIsAuthenticated(true);
        fetchCart();
      } catch {
        logout();
      }
    };
    fetchProfile();
  }, [token]);

  // Fetch user's cart
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/cart/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cart || []);
      setTotalAmount(res.data.totalAmount || 0);
    } catch (err) {
      console.error(err);
    }
  };

  // Add to cart
  const addToCart = async (productID, quantity = 1) => {
    if (!token) {
      toast.error("Please login first", { autoClose: 1500, theme: "dark" });
      return;
    }

    const existingItem = cart.find((item) => item.product_id === productID);

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;
      setCart((prev) =>
        prev.map((item) =>
          item.product_id === productID ? { ...item, quantity: newQty } : item
        )
      );
      setTotalAmount((prev) =>
        prev - existingItem.price * existingItem.quantity + existingItem.price * newQty
      );

      try {
        await axios.post(
          `${url}/cart/update`,
          { productID, quantity: newQty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(`Quantity updated to ${newQty}`, {
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      } catch {
        fetchCart();
      }
    } else {
      const product = products.find((p) => p.id === productID);
      if (!product) return;
      const newItem = { ...product, product_id: productID, quantity };
      setCart((prev) => [...prev, newItem]);
      setTotalAmount((prev) => prev + product.price * quantity);

      try {
        await axios.post(
          `${url}/cart/add`,
          { productID, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Product added to cart!", {
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      } catch {
        fetchCart();
      }
    }
  };

  // Update cart quantity
  const updateCartQty = async (productID, quantity) => {
    if (!token || quantity <= 0) return removeFromCart(productID);

    const item = cart.find((i) => i.product_id === productID);
    if (!item) return;

    setCart((prev) =>
      prev.map((i) => (i.product_id === productID ? { ...i, quantity } : i))
    );
    setTotalAmount((prev) => prev - item.price * item.quantity + item.price * quantity);

    try {
      await axios.post(
        `${url}/cart/update`,
        { productID, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Quantity updated to ${quantity}`, {
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    } catch {
      fetchCart();
    }
  };

  // Remove item
  const removeFromCart = async (productID) => {
    if (!token) return;
    const item = cart.find((i) => i.product_id === productID);
    if (!item) return;

    setCart((prev) => prev.filter((i) => i.product_id !== productID));
    setTotalAmount((prev) => prev - item.price * item.quantity);

    try {
      await axios.delete(`${url}/cart/remove/${productID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Product removed from cart", {
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    } catch {
      fetchCart();
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${url}/user/register`, { name, email, password });
      toast.success(res.data.message, {
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      toast.error(message, { autoClose: 1500, theme: "dark", transition: Bounce });
      return { success: false, message };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${url}/user/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
      toast.success(res.data.message, {
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
      fetchCart();
      return { success: true, message: res.data.message };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message, { autoClose: 1500, theme: "dark", transition: Bounce });
      return { success: false, message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
    setTotalAmount(0);
    toast.info("Logged out successfully", { autoClose: 1500, theme: "dark", transition: Bounce });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filteredData,
        setFilteredData,
        user,
        token,
        isAuthenticated,
        cart,
        totalAmount,
        addToCart,
        updateCartQty,
        removeFromCart,
        fetchCart,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
