"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  email: string;
  skills?: string[];
  experience?: string;
  collegeStudent?: boolean;
  dream?: string;
  currentRole?: string;
  areaOfInterest?: string[];
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (provider?: string) => void;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (provider?: string) => {
    // For demo purposes, we'll simulate a login
    // In a real app, this would handle OAuth or credential login
    if (provider) {
      // Simulate OAuth login
      setUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'demo@example.com',
      });
      router.push('/dashboard');
    } else {
      // Handle credential login through API
      router.push('/login');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        router.push('/dashboard');
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An error occurred during signup' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      // This would be an API call to update user profile
      // For now, we'll just update the local state
      if (user) {
        setUser({ ...user, ...userData });
      }
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserProfile }}>
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