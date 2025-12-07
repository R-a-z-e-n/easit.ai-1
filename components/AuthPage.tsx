
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mail, Lock, User, Loader, AlertCircle } from 'lucide-react';
import type { User as AppUser } from '../types';
import apiService from '../services/apiService';

interface AuthPageProps {
  onLoginSuccess: (user: AppUser, token: string) => void;
  onGoBack: () => void;
}

const logoUrl = 'data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z';

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onGoBack }) => {
    const googleButtonRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);
    
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (hasInitialized.current || !googleButtonRef.current) return;
        if (typeof google === 'undefined') return;
        
        hasInitialized.current = true;

        const handleCredentialResponse = async (response: { credential?: string }) => {
            if (response.credential) {
                try {
                    setError(null);
                    const { token, user } = await apiService.googleAuth(response.credential);
                    onLoginSuccess(user, token);
                } catch (err) {
                    console.error("Authentication failed:", err);
                    setError("Google Login failed. Please try again.");
                }
            }
        };

        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        if (GOOGLE_CLIENT_ID) {
             google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });

            google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: 'filled_black', size: 'large', type: 'standard', text: 'continue_with', width: '320' }
            );
        }
    }, [onLoginSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (mode === 'signup') {
                const { token, user } = await apiService.signup(name, email, password);
                onLoginSuccess(user, token);
            } else {
                const { token, user } = await apiService.login(email, password);
                onLoginSuccess(user, token);
            }
        } catch (err: any) {
            setError(err.message || "Authentication failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-deep-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]">
            <div className="relative w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
                <button 
                    onClick={onGoBack} 
                    className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>
                
                <div className="text-center mb-8">
                    <img src={logoUrl} alt="Logo" className="h-10 w-auto mx-auto mb-4 rounded-full" />
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {mode === 'login' ? 'Welcome back' : 'Create an account'}
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        {mode === 'login' ? 'Enter your details to access your account' : 'Start building your voice AI today'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-white/5 rounded-lg mb-6">
                    <button
                        onClick={() => { setMode('login'); setError(null); }}
                        className={`py-2 text-sm font-medium rounded-md transition-all ${mode === 'login' ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setMode('signup'); setError(null); }}
                        className={`py-2 text-sm font-medium rounded-md transition-all ${mode === 'signup' ? 'bg-brand-blue text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-300 ml-1">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-300 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-300 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            <AlertCircle size={16} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading && <Loader size={16} className="animate-spin" />}
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-[#050505] text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div ref={googleButtonRef} className="overflow-hidden rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};
