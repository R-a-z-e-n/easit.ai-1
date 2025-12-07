import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { TopBar } from './components/TopBar';
import { Modal } from './components/Modal';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';
import { ToastContainer, type ToastMessage, type ToastType } from './components/Toast';
import type { Conversation, Message, User, PersonaSettings, ConnectionStatus } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WelcomeScreen } from './components/WelcomeScreen';
import apiService from './services/apiService';
import backendAPI from './services/backendAPI';
import { websocketService } from './services/websocketService';
import { GoogleGenAI } from "@google/genai";

interface ChatAppProps {
  user: User;
  onSignOut: () => void;
}

const DEFAULT_PERSONA: PersonaSettings = {
    tone: 'friendly',
    verbosity: 'balanced',
    style: 'casual'
};

const getApiKey = () => {
  try {
    return process.env.API_KEY || "AIzaSyB2B132gxcIRhgG0nii6dryOlbJ4La4Pkg";
  } catch (e) {
    return "AIzaSyB2B132gxcIRhgG0nii6dryOlbJ4La4Pkg";
  }
};

const ChatApp: React.FC<ChatAppProps> = ({ user, onSignOut }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [personaSettings, setPersonaSettings] = useLocalStorage<PersonaSettings>('easit-persona', DEFAULT_PERSONA);
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  // Helper to add toast notifications
  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const systemInstruction = useMemo(() => {
      const toneMap: Record<string, string> = {
        friendly: "Be warm, encouraging, and use a conversational tone with occasional emojis.",
        professional: "Be formal, objective, and maintain a respectful distance. Avoid emojis.",
        humorous: "Be witty, playful, and include lighthearted jokes where appropriate.",
        empathetic: "Be understanding, validate the user's feelings, and offer supportive language."
      };

      const verbosityMap: Record<string, string> = {
        concise: "Keep responses extremely brief and directly to the point. No fluff.",
        balanced: "Provide moderate detail, explaining key concepts clearly without over-explaining.",
        detailed: "Provide comprehensive, in-depth responses covering background, examples, and edge cases."
      };

      const styleMap: Record<string, string> = {
        casual: "Use relaxed language, contractions (e.g., 'don't', 'can't'), and simple terms.",
        formal: "Use standard, grammatically rigorous English. Avoid contractions and slang.",
        technical: "Use precise technical terminology. Assume the user is an expert developer."
      };

      return `You are Easit.ai, an intelligent assistant for the SolveEarn community.
      
      Follow these PERSONA INSTRUCTIONS strictly:
      1. TONE: ${toneMap[personaSettings.tone] || toneMap.friendly}
      2. VERBOSITY: ${verbosityMap[personaSettings.verbosity] || verbosityMap.balanced}
      3. STYLE: ${styleMap[personaSettings.style] || styleMap.casual}
      
      Always prioritize the user's request while maintaining this persona.`;
  }, [personaSettings]);

  // WebSocket Connection Monitoring
  useEffect(() => {
      const handleStatusChange = (status: ConnectionStatus) => {
          setConnectionStatus(status);
      };

      websocketService.addStatusListener(handleStatusChange);
      return () => {
          websocketService.removeStatusListener(handleStatusChange);
      };
  }, []);

  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        // Try to load from backend first
        try {
            const backendConversations = await backendAPI.getConversations(user.email);
            setConversations(backendConversations);
        } catch (backendErr) {
            console.warn("Backend unavailable, using local storage:", backendErr);
            // Fallback to local storage
            const storedConversations = await apiService.getConversations();
            setConversations(storedConversations);
        }
    } catch (err: any) {
        console.error("Failed to load conversations:", err);
        setError("Failed to load your conversations.");
        addToast(err.message || "Failed to load conversations", 'error');
    } finally {
        setIsLoading(false);
    }
  }, [addToast, user.email]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);
  
  // Auto-save conversations for guest users
  useEffect(() => {
      if (!isLoading && user.email === 'guest@solveearn.com') {
          localStorage.setItem('easit-guest-conversations', JSON.stringify(conversations));
      }
  }, [conversations, user, isLoading]);

  const handleAiMessage = useCallback((data: any) => {
    if (data.type === 'aiMessage') {
        const { conversationId, message } = data.payload;
        setConversations(prev => {
            return prev.map(c => {
                if (c.id === conversationId) {
                    return { ...c, messages: [...c.messages, message] };
                }
                return c;
            });
        });
    } else if (data.type === 'error') {
        addToast(data.payload.message || 'An error occurred', 'error');
    }
  }, [addToast]);

  useEffect(() => {
      websocketService.addMessageListener(handleAiMessage);
      return () => {
          websocketService.removeMessageListener(handleAiMessage);
      };
  }, [handleAiMessage]);


  const activeConversation = useMemo(() => {
    return conversations.find(c => c.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  const handleNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setIsMobileSidebarOpen(false);
  }, []);
  
  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setIsMobileSidebarOpen(false);
  }, []);

  const addMessageToConversation = useCallback(async (conversationId: string, message: Message) => {
    // Optimistically update UI
    setConversations(prev => prev.map(c => {
        if (c.id === conversationId) {
            return { ...c, messages: [...c.messages, message] };
        }
        return c;
    }));

    const token = localStorage.getItem('easit-jwt');
    const isGuest = token && token.includes('guest-demo-token');

    if (isGuest && message.role === 'user') {
        try {
            const ai = new GoogleGenAI({ apiKey: getApiKey() });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: message.text,
                config: {
                    systemInstruction: systemInstruction
                }
            });
            const text = response.text;
            if (text) {
                 const aiMessage: Message = {
                    id: `ai-${Date.now()}`,
                    role: 'model',
                    text: text,
                    timestamp: new Date().toISOString()
                };
                setConversations(prev => prev.map(c => 
                    c.id === conversationId ? { ...c, messages: [...c.messages, aiMessage] } : c
                ));
            }
        } catch (e: any) {
            console.error("Gemini Error", e);
             const errorMessage: Message = {
                id: `err-${Date.now()}`,
                role: 'model',
                text: "I'm having trouble connecting right now. Please try again.",
                timestamp: new Date().toISOString()
            };
             setConversations(prev => prev.map(c => 
                c.id === conversationId ? { ...c, messages: [...c.messages, errorMessage] } : c
            ));
            addToast("Failed to generate response: " + e.message, 'error');
        }
    } else if (!isGuest) {
        // Send message to backend via WebSocket
        try {
            websocketService.sendMessage('chatMessage', { conversationId, userMessage: message, systemInstruction });
        } catch (e: any) {
             addToast("Connection error: Message not sent.", 'error');
        }
    }
  }, [systemInstruction, addToast]);

  const handleSaveConversation = useCallback(() => {
    if (!activeConversation) {
        addToast('No active conversation to save', 'info');
        return;
    }

    try {
        const title = activeConversation.title || 'Conversation';
        const date = new Date(activeConversation.createdAt).toLocaleDateString();
        
        let content = `Title: ${title}\nDate: ${date}\n\n`;
        
        activeConversation.messages.forEach(msg => {
            const role = msg.role === 'user' ? 'You' : 'Easit.ai';
            const time = new Date(msg.timestamp).toLocaleTimeString();
            content += `[${time}] ${role}:\n${msg.text}\n\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_').toLowerCase()}_transcript.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        addToast('Conversation saved successfully', 'success');
    } catch (e) {
        console.error('Failed to save conversation:', e);
        addToast('Failed to save conversation', 'error');
    }
  }, [activeConversation, addToast]);

  
  const getModalContent = (modalTitle: string) => {
      switch (modalTitle.toLowerCase()) {
          case 'about': return <p>Easit.ai is a modern, conversational AI assistant with a sleek interface.</p>;
          case 'privacy': return <p>Your privacy is important. Conversations are now securely stored in your account.</p>;
          case 'contact us': return <p>Contact us at <a href="mailto:support@easit.ai" className="text-brand-blue hover:underline">support@easit.ai</a>.</p>;
          case 'account': return <p>You are signed in as {user.email}.</p>;
          default: return <p>Content not available.</p>;
      }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-t-transparent border-brand-blue rounded-full animate-spin"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadConversations}
            className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (activeConversation) {
      return (
        <ChatView
          key={activeConversation.id}
          conversation={activeConversation}
          addMessage={addMessageToConversation}
          systemInstruction={systemInstruction}
          apiKey={personaSettings.apiKey}
        />
      );
    }

    return <WelcomeScreen onNewConversation={handleNewConversation} />;
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans overflow-hidden">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <main className="flex flex-1 flex-col transition-all duration-300 md:pl-64">
        <TopBar 
            user={user}
            onSignOut={onSignOut}
            onToggleSidebar={() => setIsMobileSidebarOpen(true)}
            onShowModal={setActiveModal}
            onShowSettings={() => setSettingsModalVisible(true)}
            onSaveConversation={handleSaveConversation}
            conversationTitle={activeConversation?.title}
            connectionStatus={connectionStatus}
        />
        <div className="flex-1 overflow-hidden">
            {renderContent()}
        </div>
        <Footer />
      </main>
      
      {isSettingsModalVisible && (
        <SettingsModal 
            settings={personaSettings}
            onUpdate={setPersonaSettings}
            onClose={() => setSettingsModalVisible(false)}
        />
      )}

      {activeModal && (
          <Modal title={activeModal} onClose={() => setActiveModal(null)}>
              {getModalContent(activeModal)}
          </Modal>
      )}
    </div>
  );
};

export default ChatApp;