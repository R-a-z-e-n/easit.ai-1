
import type { Message, ConnectionStatus } from '../types';

const WEBSOCKET_URL = 'ws://localhost:8000/ws'; // Updated to FastAPI default port

type Listener<T> = (data: T) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private messageListeners: Listener<any>[] = [];
    private statusListeners: Listener<ConnectionStatus>[] = [];
    
    private reconnectTimeout: any = null;
    private reconnectAttempts = 0;
    private maxReconnectDelay = 30000;
    private token: string | null = null;
    public status: ConnectionStatus = 'disconnected';

    connect(token: string) {
        this.token = token;
        
        // Prevent multiple connections
        if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
            return;
        }

        this.updateStatus('connecting');
        this.ws = new WebSocket(WEBSOCKET_URL);

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.updateStatus('connected');
            this.reconnectAttempts = 0;
            // Authenticate the WebSocket connection
            this.ws?.send(JSON.stringify({ type: 'auth', payload: { token } }));
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.messageListeners.forEach(listener => listener(data));
            } catch (e) {
                console.error("Failed to parse websocket message", e);
            }
        };

        this.ws.onclose = (event) => {
            console.log('WebSocket disconnected', event.code, event.reason);
            this.ws = null;
            if (this.status !== 'disconnected') {
                // If the close wasn't intentional (i.e. disconnect() wasn't called), attempt reconnect
                this.attemptReconnect();
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            // On error, the close event usually follows, which handles the retry
        };
    }

    private attemptReconnect() {
        this.updateStatus('reconnecting');
        
        // Exponential backoff: 1s, 2s, 4s, 8s... up to maxReconnectDelay
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
        this.reconnectAttempts++;
        
        console.log(`Reconnecting in ${delay}ms... (Attempt ${this.reconnectAttempts})`);
        
        if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
        
        this.reconnectTimeout = setTimeout(() => {
            if (this.token) {
                this.connect(this.token);
            }
        }, delay);
    }

    disconnect() {
        console.log("Closing WebSocket connection manually");
        this.updateStatus('disconnected');
        this.token = null;
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    private updateStatus(newStatus: ConnectionStatus) {
        this.status = newStatus;
        this.statusListeners.forEach(listener => listener(newStatus));
    }

    sendMessage(type: string, payload: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, payload }));
        } else {
            console.warn('WebSocket is not connected. Message not sent:', type);
            throw new Error('Not connected to server');
        }
    }
    
    addMessageListener(callback: Listener<any>) {
        this.messageListeners.push(callback);
    }
    
    removeMessageListener(callback: Listener<any>) {
        this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
    }

    addStatusListener(callback: Listener<ConnectionStatus>) {
        this.statusListeners.push(callback);
        // Immediately trigger with current status
        callback(this.status);
    }

    removeStatusListener(callback: Listener<ConnectionStatus>) {
        this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    }
}

// Export a singleton instance
export const websocketService = new WebSocketService();
