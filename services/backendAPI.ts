// Backend API Service
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const backendAPI = {
  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Backend health check failed:', error);
      return { status: 'unavailable' };
    }
  },

  // Conversations
  async createConversation(title: string, userEmail: string) {
    const response = await fetch(`${BACKEND_URL}/api/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        user_email: userEmail,
      }),
    });
    if (!response.ok) throw new Error('Failed to create conversation');
    return await response.json();
  },

  async getConversations(email: string) {
    const response = await fetch(`${BACKEND_URL}/api/conversations?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch conversations');
    return await response.json();
  },

  async getConversation(conversationId: string) {
    const response = await fetch(`${BACKEND_URL}/api/conversations/${conversationId}`);
    if (!response.ok) throw new Error('Failed to fetch conversation');
    return await response.json();
  },

  // Messages
  async createMessage(conversationId: string, role: string, text: string) {
    const response = await fetch(`${BACKEND_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        role,
        text,
      }),
    });
    if (!response.ok) throw new Error('Failed to create message');
    return await response.json();
  },

  async getMessages(conversationId: string) {
    const response = await fetch(`${BACKEND_URL}/api/conversations/${conversationId}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return await response.json();
  },

  // Users
  async createUser(id: string, name: string, email: string, picture?: string) {
    const response = await fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        email,
        picture,
      }),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  },

  async getUser(email: string) {
    const response = await fetch(`${BACKEND_URL}/api/users/${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  },
};

export default backendAPI;
