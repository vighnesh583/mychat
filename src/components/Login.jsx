import { useState } from 'react';
import '../styles/Login.css';

/**
 * Login Component
 * Simple authentication - user enters username to join chat
 * No password required for this demo application
 */
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate username
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    // Clear any errors and proceed with login
    setError('');
    onLogin(trimmedUsername);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>💬 Real-Time Chat</h1>
          <p>Enter your name to start chatting</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            autoFocus
          />
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="login-button">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
