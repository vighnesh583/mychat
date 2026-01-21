import { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, update } from 'firebase/database';
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
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const messagesEndRef = useRef(null);
  const previousMessageIdsRef = useRef(new Set());
  const messagesRef = ref(database, 'messages');

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  }, []);

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

        // Mark unread messages as seen
        const updates = {};
        messagesArray.forEach((message) => {
          if (message.username !== username && message.seen === false) {
            updates[`${message.id}/seen`] = true;
          }
        });
        if (Object.keys(updates).length > 0) {
          update(messagesRef, updates).catch(err => console.error('Failed to update seen status:', err));
        }

        // Trigger browser notification for new messages
        if (!loading && notificationPermission === 'granted') {
          messagesArray.forEach((message) => {
            // Only notify for messages from others that we haven't seen before
            if (message.username !== username && !previousMessageIdsRef.current.has(message.id)) {
              new Notification('New Message', {
                body: 'You have received a new message',
                icon: '/vite.svg',
                tag: message.id // Prevents duplicate notifications
              });
            }
          });
        }

        // Update the set of known message IDs
        previousMessageIdsRef.current = new Set(messagesArray.map(m => m.id));
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loading, notificationPermission, username]);

  // Send message to Firebase
  const handleSendMessage = async (text) => {
    try {
      await push(messagesRef, {
        text,
        username,
        timestamp: Date.now(),
        seen: false // Default seen to false
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
