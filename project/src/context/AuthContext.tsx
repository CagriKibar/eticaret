import React, { createContext, useState, useContext, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // This would normally validate with a backend
    if (email && password) {
      // Simulate API call
      const mockUser = {
        id: 1,
        name: 'Örnek Kullanıcı',
        email,
      };
      
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // This would normally create a user in the backend
    if (name && email && password) {
      const mockUser = {
        id: 1,
        name,
        email,
      };
      
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};