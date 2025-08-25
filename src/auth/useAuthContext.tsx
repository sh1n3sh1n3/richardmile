import { createContext, useContext, ReactNode, useMemo } from 'react';

// ----------------------------------------------------------------------

interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// ----------------------------------------------------------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------------------------------------------

// Mock user data for development
const mockUser: User = {
  id: '1',
  displayName: 'John Doe',
  email: 'john.doe@example.com',
  photoURL: '/assets/images/portraits/portrait_1.jpg',
  role: 'Admin',
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const login = () => {
    // Implement login logic here
    console.log('Login called');
  };

  const logout = () => {
    // Implement logout logic here
    console.log('Logout called');
  };

  const value: AuthContextType = useMemo(
    () => ({
      user: mockUser,
      isAuthenticated: true,
      login,
      logout,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ----------------------------------------------------------------------

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
