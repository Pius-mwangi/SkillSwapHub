import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSeekerLogin = () => {
    // Navigate to the dashboard for seekers
    navigate('/dashboard');
  };

  const handleProviderLogin = () => {
    // Navigate to the SkillProvider page for providers
    navigate('/skillprovider');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      username: username,
      password: password,
    };

    fetch('https://skillswap-0fqo.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          onLogin();
          // Use navigate to redirect to the dashboard for seekers
          navigate('/dashboard');
        } else {
          return response.json().then((errorData) => {
            console.error('Authentication failed:', errorData.error);
          });
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="login-options">
          <button type="button" onClick={handleSeekerLogin}>
            Login as Seeker
          </button>
          <button type="button" onClick={handleProviderLogin}>
            Login as Provider
          </button>
        </div>
        <p>Hint: You can use any username and password for testing purposes.</p>
       
      </form>
    </div>
  );
}

export default Login;
