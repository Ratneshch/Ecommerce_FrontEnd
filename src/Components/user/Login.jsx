import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AppContext); // Use a login function from context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const { email, password } = formData;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(email, password); // Call login instead of register

        if (result.success) {
            navigate('/'); // Navigate to home/dashboard after login
        }

        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">User Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

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
                        Login
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Login;
