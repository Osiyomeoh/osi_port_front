import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatService from '../services/ChatService';
import '../styles/ChatWidget.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  automated?: boolean;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  // Socket and connection states
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // UI states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // User information states - this is the key addition
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [showNameForm, setShowNameForm] = useState<boolean>(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize connection and check for saved user info
  useEffect(() => {
    // Check if user already provided name
    const savedName = localStorage.getItem('chat_user_name');
    const savedEmail = localStorage.getItem('chat_user_email');
    
    if (savedName) {
      setUserName(savedName);
      setShowNameForm(false);
    }
    
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    
    // Connect to chat service
    ChatService.setCallbacks({
      onMessage: (message) => {
        setMessages(prev => [...prev, message]);
        setIsTyping(false);
      },
      onStatusChange: (status) => {
        if (status.status === 'received') {
          setIsTyping(true);
        }
      },
      onConnectionChange: (isConnected) => {
        setConnected(isConnected);
      }
    });
    
    ChatService.connect();
    
    return () => {
      ChatService.disconnect();
    };
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && !showNameForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized, showNameForm]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };
  
  const minimizeChat = () => {
    setIsMinimized(true);
  };
  
  const maximizeChat = () => {
    setIsMinimized(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle name form submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) return;
    
    // Save user info
    localStorage.setItem('chat_user_name', userName);
    if (userEmail) {
      localStorage.setItem('chat_user_email', userEmail);
    }
    
    // Show chat interface
    setShowNameForm(false);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || !connected) return;
    
    // Add message to UI immediately
    const userMessage: Message = {
      id: `local_${Date.now()}`,
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send to server with user info
    ChatService.sendMessage(inputValue.trim(), {
      userName,
      userEmail
    });
    
    // Clear input
    setInputValue('');
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="chat-widget-container">
      {/* Chat button */}
      <button 
        className={`chat-button ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Chat with me"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={`chat-window ${isMinimized ? 'minimized' : ''}`}
          data-theme={document.documentElement.getAttribute('data-theme') || 'light'}
        >
          {/* Chat header */}
          <div className="chat-header">
            <div className="chat-avatar">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div className="chat-info">
              <div className="chat-name">Portfolio Assistant</div>
              <div className="chat-status">{connected ? 'Online' : 'Connecting...'}</div>
            </div>
            <div className="chat-actions">
              {isMinimized ? (
                <button onClick={maximizeChat} className="chat-maximize" aria-label="Maximize chat">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </button>
              ) : (
                <button onClick={minimizeChat} className="chat-minimize" aria-label="Minimize chat">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="4 14 10 14 10 20"></polyline>
                    <polyline points="20 10 14 10 14 4"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </button>
              )}
              <button onClick={toggleChat} className="chat-close" aria-label="Close chat">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Chat content */}
          {!isMinimized && (
            <>
              {showNameForm ? (
                <div className="chat-name-form">
                  <form onSubmit={handleNameSubmit}>
                    <h3>Welcome to chat!</h3>
                    <p>Please enter your name to start chatting</p>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <button type="submit">Start Chat</button>
                  </form>
                </div>
              ) : (
                <>
                  <div className="chat-messages">
                    {messages.map((message) => (
                      <div key={message.id} className={`message ${message.sender}`}>
                        <div className="message-content">
                          <div className="message-text">{message.text}</div>
                          <div className="message-time">
                            {formatTime(message.timestamp)}
                            {message.sender === 'bot' && message.automated && 
                              <span className="automated-badge">Auto</span>
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="message bot">
                        <div className="message-content">
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input */}
                  <form className="chat-input-container" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      className="chat-input"
                      placeholder="Type a message..."
                      value={inputValue}
                      onChange={handleInputChange}
                      ref={inputRef}
                      disabled={!connected}
                    />
                    <button 
                      type="submit" 
                      className="chat-send-button"
                      disabled={!inputValue.trim() || !connected}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;