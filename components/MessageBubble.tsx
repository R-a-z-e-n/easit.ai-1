
import React from 'react';
import type { Message } from '../types';
import { User, Sparkles, Link } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 h-6 px-2">
        <span className="w-2 h-2 bg-brand-blue/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-brand-purple/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-brand-blue/60 rounded-full animate-bounce"></span>
    </div>
);


export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === 'user';

  const bubbleClasses = isUser
    ? 'bg-brand-blue text-white rounded-br-none'
    : 'bg-white/20 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 rounded-bl-none backdrop-blur-sm shadow-sm';
  
  const layoutClasses = isUser ? 'justify-end' : 'justify-start';
  
  const Avatar: React.FC = () => (
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-brand-purple shadow-lg shadow-brand-purple/20' : 'bg-gray-800 border border-white/10'}`}>
      {isUser ? <User size={16} className="text-white"/> : <Sparkles size={16} className="text-brand-blue"/>}
    </div>
  );

  return (
    <div className={`flex items-end gap-3 ${layoutClasses} animate-slide-up-fade-in`}>
      {!isUser && <Avatar />}
      <div className="flex flex-col gap-2">
        <div className={`p-4 max-w-xl rounded-2xl ${bubbleClasses}`}>
          {isLoading ? <TypingIndicator /> : <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>}
        </div>
        {message.groundingMetadata && message.groundingMetadata.length > 0 && !isLoading && (
          <div className="max-w-xl animate-fade-in">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 pl-1">Sources</h4>
            <div className="flex flex-wrap gap-2">
              {message.groundingMetadata.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded-full transition-colors"
                  title={source.title}
                >
                  <Link size={12} />
                  <span className="truncate max-w-[200px]">{new URL(source.uri).hostname}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && <Avatar />}
    </div>
  );
};
