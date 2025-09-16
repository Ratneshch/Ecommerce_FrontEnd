import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
 import { ToastContainer, toast ,Bounce} from 'react-toastify';

const AppState = (props) => {

    const url = "http://localhost:3000/api";

  const [products, setProducts] = useState([]);
const [token, setToken] = useState([]);



  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/products/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data);
      setProducts(api.data);
    };
    fetchProduct();
  }, []);

//register user 
const register = async (name, email, password) => {
  try {
    const api = await axios.post(`${url}/user/register`, { name, email, password }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Show toast success
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // ✅ Return success object
    return { success: true, message: api.data.message };
  } catch (error) {
    let message = "Registration failed. Please try again.";

    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    // Show toast error
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    console.error("Registration error:", error);

    // ✅ Return failure object
    return { success: false, message };
  }
};

//login user
const login = async (email, password) => {
  try {
    const api = await axios.post(`${url}/user/login`, { email, password }, { withCredentials: true });
    alert(api.data.message);
    return { success: true, message: api.data.message };
  } catch (error) {
    let message = "Login failed";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    alert(message);
    return { success: false, message };
  }
};



  return (
    <AppContext.Provider value={{ products,register ,login}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;


