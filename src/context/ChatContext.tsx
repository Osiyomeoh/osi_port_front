import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import ChatService, { Message, StatusUpdate } from '../services/ChatService';

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => boolean;
  isConnected: boolean;
  isTyping: boolean;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => false,
  isConnected: false,
  isTyping: false,
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  useEffect(() => {
    // Set up callbacks
    ChatService.setCallbacks({
      onMessage: (message: Message) => {
        setMessages(prev => [...prev, message]);
        setIsTyping(false);
      },
      onStatusChange: (status: StatusUpdate) => {
        if (status.status === 'received') {
          setIsTyping(true);
        }
      },
      onConnectionChange: (connected: boolean) => {
        setIsConnected(connected);
      }
    });
    
    // Connect to chat server
    ChatService.connect();
    
    // Cleanup on unmount
    return () => {
      ChatService.disconnect();
    };
  }, []);
  
  const sendMessage = (text: string): boolean => {
    // Add message to UI immediately
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Send via socket
    return ChatService.sendMessage(text);
  };
  
  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isConnected,
        isTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => useContext(ChatContext);