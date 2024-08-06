

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupStyle, showPopup] = useState("hide");
  const navigate = useNavigate(); // Updated to use useNavigate

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match'); // Basic client-side validation
      return;
    }

    try {
      const response = await axios.post('/api/register', { username, password });
      console.log(response.data); // Handle registration success
      navigate('/login'); // Navigate to login on success
    } catch (error) {
      console.error(error.response?.data || 'Error occurred while registering user');
      showPopup("register-popup");
      setTimeout(() => showPopup("hide"), 3000);
    }
  };

  return (
    <div className="page">
      <div className="cover">
        <h1>Register</h1>
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <div className="login-btn" onClick={handleRegister}>
          Register
        </div>
        <div className={popupStyle}>
          <h3>Register Failed</h3>
          <p>Error occurred while registering user</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
