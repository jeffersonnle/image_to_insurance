import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        navigate("/"); // Redirect to dashboard or another page
      } else {
        alert(`Error: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error submitting login:", error);
      alert("Login failed.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen" style={{ backgroundColor: '#D8F3FF' }}>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account? <a href="register" className="text-blue-500" onClick={() => navigate("/register")}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
