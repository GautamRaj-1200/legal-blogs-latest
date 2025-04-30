import { createContext } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error('setUser was called outside of AuthProvider');
  },
});

export default AuthContext;
