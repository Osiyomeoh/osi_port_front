import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import '../styles/ChatAdmin.css';

interface Session {
  id: string;
  lastMessage: string;
  lastActivity: Date;
  unread: number;
  userName: string;
  userEmail?: string;
  isOnline?: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
}

interface ServerMessage {
  _id: string;
  message: string;
  response: string | null;
  createdAt: string;
  respondedAt?: string;
  status?: string;
  userName?: string;
  userEmail?: string;
  metadata?: {
    name?: string;
    email?: string;
  };
}

const ChatAdmin: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [response, setResponse] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Fetch sessions function
  const fetchSessions = async () => {
    try {
      if (!socket) return;
      
      console.log("Fetching active sessions...");
      setIsLoading(true);
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          console.log("Session fetching timed out");
          setIsLoading(false);
        }
      }, 5000);
      
      // Emit a direct request for sessions
      socket.emit('getAllSessions', (response: { 
        id: string;
        lastMessage: string;
        lastActivity: string;
        unread: number;
        userName: string;
        userEmail?: string;
        isOnline?: boolean;
      }[]) => {
        clearTimeout(timeoutId);
        console.log("Sessions response:", response);
        if (response && Array.isArray(response)) {
          setSessions(response.map(s => ({
            ...s,
            lastActivity: new Date(s.lastActivity),
            unread: s.unread || 0
          })));
        } else {
          console.error("Invalid sessions response:", response);
          setSessions([]);
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setIsLoading(false);
    }
  };
  
  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    setIsLoading(true);
    setIsLoggedIn(true); // We'll verify in the WebSocket connection
  };
  
  // On component unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus on the response input when selecting a session
  useEffect(() => {
    if (currentSession && responseInputRef.current) {
      responseInputRef.current.focus();
    }
  }, [currentSession]);
  
  // Setup admin socket connection
  useEffect(() => {
    if (!isLoggedIn) return;
    
    console.log("Setting up WebSocket connection");
    setIsLoading(true);
    
    // Connect to WebSocket server
    const newSocket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Admin connected to chat server');
      // Log in as admin
      newSocket.emit('adminLogin', { password: password });
    });
    
    newSocket.on('connect_error', (error) => {
      console.error("Socket connection error:", error);
      setError("Failed to connect to chat server: " + error.message);
      setIsLoading(false);
      setIsLoggedIn(false);
    });
    
    newSocket.on('adminLoginResponse', (data) => {
      console.log("Admin login response:", data);
      if (!data.success) {
        setError(data.message || 'Failed to login as admin');
        setIsLoggedIn(false);
        newSocket.disconnect();
      } else {
        setError(null);
        setIsLoading(false);
        // Fetch sessions after successful login
        fetchSessions();
      }
    });

    newSocket.on('newUserMessage', (data: {
      id: string;
      sessionId: string;
      message: string;
      userName?: string;
      userEmail?: string;
      timestamp: string;
    }) => {
      console.log('New user message received:', data);
      
      // Play notification sound if available
      const notificationSound = document.getElementById('notificationSound') as HTMLAudioElement;
      if (notificationSound && currentSession?.id !== data.sessionId) {
        notificationSound.play().catch(e => console.log('Error playing sound:', e));
      }
      
      // Add new message to the appropriate session
      setSessions(prev => {
        const sessionExists = prev.some(s => s.id === data.sessionId);
        
        if (sessionExists) {
          return prev.map(s => {
            if (s.id === data.sessionId) {
              return {
                ...s,
                lastMessage: data.message,
                lastActivity: new Date(),
                unread: s.id !== currentSession?.id ? (s.unread || 0) + 1 : 0,
                isOnline: true
              };
            }
            return s;
          });
        } else {
          // New session
          return [...prev, {
            id: data.sessionId,
            lastMessage: data.message,
            lastActivity: new Date(),
            unread: 1,
            userName: data.userName || 'Anonymous',
            userEmail: data.userEmail,
            isOnline: true
          }];
        }
      });

      // If this is the current session, add message to messages
      if (currentSession?.id === data.sessionId) {
        setMessages(prev => [...prev, {
          id: data.id,
          text: data.message,
          sender: 'user',
          timestamp: new Date(data.timestamp)
        }]);
      }
    });
    
    newSocket.on('userTyping', (data: { sessionId: string, isTyping: boolean }) => {
      if (currentSession?.id === data.sessionId) {
        setIsTyping(data.isTyping);
      }
    });

    newSocket.on('error', (error) => {
      console.error("Socket error:", error);
      setError(error.message || "An error occurred");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isLoggedIn, password, currentSession]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSession = (sessionId: string): void => {
    if (!socket) return;
    
    console.log("Loading session history for:", sessionId);
    setIsLoading(true);
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("Session loading timed out");
      setIsLoading(false);
    }, 5000);

    socket.emit('getSessionHistory', sessionId, (response: ServerMessage[]) => {
      clearTimeout(timeoutId);
      console.log('Session history received:', response);
      
      if (!response || !Array.isArray(response)) {
        console.error("Invalid history response:", response);
        setMessages([]);
        setIsLoading(false);
        return;
      }
      
      // Process message history
      const processedMessages: ChatMessage[] = [];
      
      response.forEach((msg: ServerMessage) => {
        // Add user message
        processedMessages.push({
          id: msg._id + '_user',
          text: msg.message,
          sender: 'user',
          timestamp: new Date(msg.createdAt)
        });
        
        // Add admin response if it exists
        if (msg.response) {
          processedMessages.push({
            id: msg._id + '_admin',
            text: msg.response,
            sender: 'admin',
            timestamp: msg.respondedAt ? new Date(msg.respondedAt) : new Date(msg.createdAt)
          });
        }
      });
      
      setMessages(processedMessages);
      
      // Find and set the current session
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
        setCurrentSession(session);
      
        // Clear unread count
        setSessions(prev => prev.map(s => {
          if (s.id === sessionId) {
            return { ...s, unread: 0 };
          }
          return s;
        }));
      }
      
      setIsLoading(false);
    });
  };

  const sendResponse = (): void => {
    if (!socket || !currentSession || !response.trim()) return;

    console.log("Sending response to session:", currentSession.id);
    
    // Find the last user message ID (without the _user suffix)
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    if (!lastUserMessage) {
      console.error("No user message found to respond to");
      return;
    }
    
    const messageId = lastUserMessage.id.split('_')[0];
    console.log("Responding to message ID:", messageId);

    // Signal that admin is typing
    socket.emit('adminTyping', { sessionId: currentSession.id, isTyping: true });
    
    // Add response to messages immediately for feedback
    const responseMsg: ChatMessage = {
      id: 'local_' + Date.now(),
      text: response.trim(),
      sender: 'admin',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, responseMsg]);
    
    // Send to server
    socket.emit('adminResponse', {
      messageId,
      sessionId: currentSession.id,
      response: response.trim()
    }, (responseStatus: any) => {
      console.log("Response status:", responseStatus);
      if (responseStatus && !responseStatus.success) {
        console.error("Error sending response:", responseStatus.message);
      }
    });

    // Clear response input
    setResponse('');
  };

  // Handle Enter key for quick sending
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (response.trim()) {
        sendResponse();
      }
    }
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Filter sessions based on search term
  const filteredSessions = sessions.filter(session => 
    (session.userName || 'Anonymous').toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>Chat Admin</h1>
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-page">
      {/* Hidden audio element for notifications */}
      <audio id="notificationSound" src="/notification.mp3" preload="auto"></audio>
      
      <div className="admin-header">
        <h1>Chat Admin Dashboard</h1>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="logout-button"
        >
          Logout
        </button>
      </div>
      
      <div className="admin-chat">
        <div className="sessions-panel">
          <div className="sessions-header">
            <h2>Active Sessions</h2>
            <button 
              onClick={fetchSessions} 
              className="refresh-button"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          <div className="search-container">
            <input 
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="sessions-list">
            {isLoading && !currentSession && (
              <div className="loading">Loading sessions...</div>
            )}
            {!isLoading && filteredSessions.length === 0 && (
              <p className="no-sessions">No active sessions</p>
            )}
            {filteredSessions.map(session => (
              <div 
                key={session.id} 
                className={`session-item ${currentSession?.id === session.id ? 'active' : ''} ${session.unread > 0 ? 'unread' : ''}`}
                onClick={() => loadSession(session.id)}
              >
                <div className="session-header">
                  <h3>{session.userName || 'Anonymous'}</h3>
                  {session.unread > 0 && <span className="unread-badge">{session.unread}</span>}
                </div>
                <p className="last-message">{session.lastMessage}</p>
                <div className="session-footer">
                  <span className="last-activity">{formatDate(new Date(session.lastActivity))}</span>
                  {session.isOnline && <span className="online-indicator"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chat-panel">
          {isLoading && currentSession && (
            <div className="loading">Loading conversation...</div>
          )}
          {!isLoading && currentSession ? (
            <>
              <div className="chat-header">
                <div className="chat-header-info">
                  <h2>{currentSession.userName || 'Anonymous'}</h2>
                  {currentSession.userEmail && (
                    <span className="user-email">{currentSession.userEmail}</span>
                  )}
                  <span className="session-id">ID: {currentSession.id}</span>
                </div>
                {currentSession.isOnline && <span className="user-status">Online</span>}
              </div>
              
              <div className="messages-container">
                {messages.length === 0 && (
                  <div className="no-messages">No messages yet</div>
                )}
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                      <div className="timestamp">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message user">
                    <div className="message-content typing">
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
              
              <div className="response-box">
                <textarea
                  ref={responseInputRef}
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your response... (Press Enter to send)"
                />
                <button 
                  onClick={sendResponse} 
                  disabled={!response.trim()}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="no-session-selected">
              <p>{isLoading ? 'Loading...' : 'Select a session to start chatting'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;