import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import ChatApp from './ChatApp';
import { AuthPage } from './components/AuthPage';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { User } from './types';
import { websocketService } from './services/websocketService';

const App: React.FC = () => {
    const [user, setUser] = useLocalStorage<User | null>('easit-user', null);
    const [jwt, setJwt] = useLocalStorage<string | null>('easit-jwt', null);
    const [authVisible, setAuthVisible] = useState(false);
    
    useTheme();

    useEffect(() => {
        if (jwt && jwt !== 'guest-demo-token') {
            websocketService.connect(jwt);
        } else {
            websocketService.disconnect();
        }

        return () => {
            websocketService.disconnect();
        };
    }, [jwt]);

    const handleSignOut = () => {
        setUser(null);
        setJwt(null);
    };

    const handleGuestLogin = () => {
        const guestUser: User = {
            name: "Easit Guest",
            email: "guest@solveearn.com",
            picture: undefined
        };
        setUser(guestUser);
        setJwt("guest-demo-token");
    };

    if (user && jwt) {
        return <ChatApp user={user} onSignOut={handleSignOut} />;
    }
    
    if (authVisible) {
        return <AuthPage 
            onLoginSuccess={(newUser, token) => {
                setUser(newUser);
                setJwt(token);
            }} 
            onGoBack={() => setAuthVisible(false)} 
        />;
    }

    return <LandingPage 
        onGetStarted={() => setAuthVisible(true)} 
        onEnterAsGuest={handleGuestLogin}
    />;
};

export default App;