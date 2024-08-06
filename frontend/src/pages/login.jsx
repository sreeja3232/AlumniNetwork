

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css"; // Ensure the path is correct
import { useAuth } from '../AuthContext'; // Adjust the path as needed

const Login = () => {
  const navigate = useNavigate();
  const { login, redirectPath } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupStyle, showPopup] = useState("hide");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulated login API call
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data);
      
      login(username); // Log the user in
      navigate(redirectPath || '/'); // Navigate to the stored redirect path or home
    } catch (error) {
      console.error(error.response?.data || 'Error logging in');
      showPopup("login-popup");
      setTimeout(() => showPopup("hide"), 3000);
    }
  };

  return (
    <div className="page">
      <div className="cover">
        <h1>Login</h1>
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="login-btn" onClick={handleLogin}>Login</div>
        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Incorrect Password</p>
        </div>
        <p className="register-link">Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;

