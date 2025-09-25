import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  userDetails: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<any | null>(null);

  useEffect(() => {
    // Check if user is already logged in on app load
    const token = localStorage.getItem('authToken');
    const storedUserDetails = localStorage.getItem('userDetails');
    
    if (token) {
      setIsAuthenticated(true);
      if (storedUserDetails) {
        try {
          setUserDetails(JSON.parse(storedUserDetails));
        } catch (error) {
          console.error('Error parsing user details:', error);
        }
      }
    }
    
    // Set loading to false after checking authentication
    setIsLoading(false);
  }, []);

  const login = () => {
    console.log('AuthContext login called');
    setIsAuthenticated(true);
    // User details should already be set from localStorage in the login hook
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      try {
        setUserDetails(JSON.parse(storedUserDetails));
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserDetails(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
