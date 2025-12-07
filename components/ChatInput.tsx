
import React, { useState, useCallback, useEffect } from 'react';
import { Mic, Send, Square, Loader2 } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { GeminiLiveStatus } from '../types';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendVoiceMessage: (userText: string, aiText: string) => void;
  isLoading: boolean;
  systemInstruction: string;
  apiKey?: string;
}

const MicButton: React.FC<{ status: GeminiLiveStatus; onClick: () => void }> = ({ status, onClick }) => {
    const getIcon = () => {
        switch (status) {
            case GeminiLiveStatus.LISTENING:
                return <Square size={20} className="text-white" />;
            case GeminiLiveStatus.CONNECTING:
                return <Loader2 size={20} className="text-white animate-spin" />;
            default:
                return <Mic size={20} className="text-white" />;
        }
    };
    
    const getPulseClass = () => {
        if (status === GeminiLiveStatus.LISTENING) {
            return 'animate-pulse ring-4 ring-red-500/20';
        }
        return '';
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${status === GeminiLiveStatus.LISTENING ? 'bg-red-500' : 'bg-brand-blue hover:bg-brand-blue/90'} ${getPulseClass()}`}
        >
            {getIcon()}
        </button>
    );
};


export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onSendVoiceMessage, isLoading, systemInstruction, apiKey }) => {
  const [inputText, setInputText] = useState('');
  const { status, userTranscript, aiTranscript, startSession, stopSession, error } = useGeminiLive();

  useEffect(() => {
    if (status === GeminiLiveStatus.LISTENING) {
      setInputText(userTranscript);
    }
  }, [userTranscript, status]);

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };
  
  const handleMicToggle = useCallback(() => {
    if (status === GeminiLiveStatus.IDLE || status === GeminiLiveStatus.ERROR) {
      startSession({
        onTurnComplete: (finalUserTranscript, finalAiTranscript) => {
          onSendVoiceMessage(finalUserTranscript, finalAiTranscript);
          setInputText('');
        },
        systemInstruction,
        apiKey
      });
    } else {
      stopSession();
    }
  }, [status, startSession, stopSession, onSendVoiceMessage, systemInstruction, apiKey]);

  const isInputDisabled = isLoading || status === GeminiLiveStatus.LISTENING || status === GeminiLiveStatus.CONNECTING;

  return (
    <div className="p-4 bg-white/5 dark:bg-gray-800/20 backdrop-blur-lg border-t border-white/10 dark:border-gray-700/50">
        {error && <div className="mb-2 text-center text-red-500 text-sm">{error}</div>}
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder={status === GeminiLiveStatus.LISTENING ? "Listening..." : "Type a message..."}
                    className="w-full p-3 pr-10 rounded-2xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue resize-none min-h-[44px] max-h-32 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    rows={1}
                    disabled={isInputDisabled}
                />
            </div>
            
            <MicButton status={status} onClick={handleMicToggle} />
            
            <button
                onClick={handleSend}
                disabled={!inputText.trim() || isInputDisabled}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue text-white hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
        </div>
        {status === GeminiLiveStatus.LISTENING && aiTranscript && (
             <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400 animate-pulse truncate">
                 AI: {aiTranscript}
             </div>
        )}
    </div>
  );
};
