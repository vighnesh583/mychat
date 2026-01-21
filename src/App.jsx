import { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import './App.css';

/**
 * Main App Component
 * Manages authentication state and routing between Login and ChatRoom
 * Persists username in localStorage for better UX
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user was previously logged in
  useEffect(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      setCurrentUser(savedUsername);
    }
  }, []);

  // Handle user login
  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem('chatUsername', username);
  };

  // Handle user logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('chatUsername');
  };

  return (
    <div className="app">
      {currentUser ? (
        <ChatRoom username={currentUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
