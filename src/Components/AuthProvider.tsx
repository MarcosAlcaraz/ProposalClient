import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextPorps {
  isAuthenticated: boolean;
  turnOnSession: () => void;
  turnOffSession: () => void;
}

const AuthContext = createContext<AuthContextPorps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const turnOnSession = () => setIsAuthenticated(true);
    const turnOffSession = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{isAuthenticated, turnOnSession, turnOffSession}}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}