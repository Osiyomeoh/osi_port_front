import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  automated?: boolean;
  timestamp: Date;
}

export interface StatusUpdate {
  id: string;
  status: 'pending' | 'received' | 'answered' | 'automated';
  message?: string;
}

export interface ChatCallbacks {
  onMessage: (message: Message) => void;
  onStatusChange: (status: StatusUpdate) => void;
  onConnectionChange: (connected: boolean) => void;
}

export interface UserInfo {
  userName?: string;
  userEmail?: string;
}

class ChatService {
  private socket: Socket | null = null;
  private sessionId: string;
  private callbacks: ChatCallbacks = {
    onMessage: () => {},
    onStatusChange: () => {},
    onConnectionChange: () => {},
  };
  
  constructor() {
    this.sessionId = localStorage.getItem('chat_session_id') || uuidv4();
    
    // Save session ID
    localStorage.setItem('chat_session_id', this.sessionId);
  }
  
  connect(backendUrl: string = 'http://localhost:3001'): void {
    // Initialize socket connection
    this.socket = io(backendUrl);
    
    // Set up event listeners
    this.socket.on('connect', () => {
      console.log('Connected to chat server');
      this.callbacks.onConnectionChange(true);
      
      // Load message history
      this.loadMessageHistory();
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      this.callbacks.onConnectionChange(false);
    });
    
    // Listen for responses to this session
    this.socket.on(`messageResponse_${this.sessionId}`, (data: any) => {
      this.callbacks.onMessage({
        id: data.id,
        text: data.response,
        sender: 'bot',
        automated: data.automated,
        timestamp: new Date(data.timestamp),
      });
    });
    
    // Listen for message status updates
    this.socket.on('messageStatus', (data: StatusUpdate) => {
      this.callbacks.onStatusChange(data);
    });
  }
  
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  
  setCallbacks(callbacks: Partial<ChatCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }
  
  sendMessage(message: string, userInfo: UserInfo = {}): boolean {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket not connected');
      return false;
    }
    
    // Get stored user info if not provided
    const userName = userInfo.userName || localStorage.getItem('chat_user_name') || undefined;
    const userEmail = userInfo.userEmail || localStorage.getItem('chat_user_email') || undefined;
    
    this.socket.emit('userMessage', {
      sessionId: this.sessionId,
      message,
      userName,
      userEmail
    });
    
    return true;
  }
  
  loadMessageHistory(): void {
    if (!this.socket) return;
    
    this.socket.emit('getSessionHistory', this.sessionId, (messages: any[]) => {
      if (messages && Array.isArray(messages)) {
        messages.forEach(msg => {
          // Add user message
          this.callbacks.onMessage({
            id: msg._id + '_user',
            text: msg.message,
            sender: 'user',
            timestamp: new Date(msg.createdAt),
          });
          
          // Add response if it exists
          if (msg.response) {
            this.callbacks.onMessage({
              id: msg._id + '_bot',
              text: msg.response,
              sender: 'bot',
              automated: msg.status === 'automated',
              timestamp: msg.respondedAt ? new Date(msg.respondedAt) : new Date(msg.createdAt),
            });
          }
        });
      }
    });
  }
  
  /**
   * Saves user information to localStorage
   */
  saveUserInfo(userName: string, userEmail?: string): void {
    if (userName) {
      localStorage.setItem('chat_user_name', userName);
    }
    
    if (userEmail) {
      localStorage.setItem('chat_user_email', userEmail);
    }
  }
  
  /**
   * Retrieves saved user information
   */
  getUserInfo(): UserInfo {
    return {
      userName: localStorage.getItem('chat_user_name') || undefined,
      userEmail: localStorage.getItem('chat_user_email') || undefined
    };
  }
  
  /**
   * Checks if user has already provided their information
   */
  hasUserInfo(): boolean {
    return !!localStorage.getItem('chat_user_name');
  }
  
  /**
   * Gets the current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}

// Export as singleton
export default new ChatService();