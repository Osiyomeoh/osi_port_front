// src/services/AdminService.ts
import { io, Socket } from 'socket.io-client';

class AdminService {
  private socket: Socket | null = null;
  
  async login(password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Create socket connection
      this.socket = io(process.env.REACT_APP_BACKEND_URL || 'https://osiyomeoh-portfoilio.onrender.com');
      
      // Set up login response handler
      this.socket.on('adminLoginResponse', (data: { success: boolean, message: string }) => {
        if (!data.success) {
          this.socket?.disconnect();
          this.socket = null;
          resolve(false);
        } else {
          resolve(true);
        }
      });
      
      // Send login request
      this.socket.emit('adminLogin', { password });
      
      // Set timeout for response
      setTimeout(() => {
        if (this.socket?.connected) {
          resolve(false);
          this.socket.disconnect();
          this.socket = null;
        }
      }, 5000);
    });
  }
  
  getSocket(): Socket | null {
    return this.socket;
  }
  
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new AdminService();