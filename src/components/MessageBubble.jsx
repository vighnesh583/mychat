import '../styles/MessageBubble.css';

/**
 * MessageBubble Component
 * Displays individual chat message with username and timestamp
 * Styling varies based on whether message is from current user or other user
 */
const MessageBubble = ({ message, isOwnMessage }) => {
  // Format timestamp to readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className={`message-wrapper ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-bubble">
        {!isOwnMessage && (
          <div className="message-username">{message.username}</div>
        )}
        <div className="message-text">{message.text}</div>
        <div className="message-timestamp">
          {formatTime(message.timestamp)}
          {isOwnMessage && (
            <span className="read-receipt">
              {message.seen ? ' ✓✓' : ' ✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
