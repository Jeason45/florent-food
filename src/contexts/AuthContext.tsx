'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Subscriber {
  id: string;
  email: string;
  subscriptionType: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  subscriber: Subscriber | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        setSubscriber(data.subscriber);
      } else {
        setIsAuthenticated(false);
        setSubscriber(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
      setSubscriber(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur de connexion');
    }

    setIsAuthenticated(true);
    setSubscriber(data.subscriber);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    setIsAuthenticated(false);
    setSubscriber(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        subscriber,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
