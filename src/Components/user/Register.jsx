import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const {register}=useContext(AppContext)
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Update form data when user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const {name,email,password}=formData;

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await register(name, email, password);

  if(result.success){
      navigate('/login'); // ✅ Navigate only if registration succeeded
  }

  setFormData({
    name: '',
    email: '',
    password: ''
  });
};


  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">User Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-2 border text-black border-gray-300 rounded mt-1"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-2 text-black border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full p-2 border text-black border-gray-300 rounded mt-1"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </div>

      </form>
    </div>
  );
};

export default Register;
