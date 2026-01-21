import { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import { database } from '../firebase';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import '../styles/ChatRoom.css';

/**
 * ChatRoom Component
 * Main chat interface with real-time message sync
 * Handles message sending, receiving, and display
 */
const ChatRoom = ({ username, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesRef = ref(database, 'messages');

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Subscribe to real-time messages from Firebase
  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert messages object to array and sort by timestamp
        const messagesArray = Object.entries(data).map(([id, message]) => ({
          id,
          ...message
        }));
        messagesArray.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Send message to Firebase
  const handleSendMessage = async (text) => {
    try {
      await push(messagesRef, {
        text,
        username,
        timestamp: Date.now() // Using Date.now() for consistency
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="chat-room">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <h2>💬 Real-Time Chat</h2>
          <div className="user-info">
            <span className="current-user">{username}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start the conversation! 👋</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.username === username}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
