import React, { createContext, useContext, useState, useEffect } from 'react';

// Defina a interface para o AuthContext
interface AuthContextProps {
  role: string | null;
  setRole: (role: string | null) => void;
  id: string | null;
  setId: (id: string | null) => void;
}

// Crie o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Tente obter o papel do usuário a partir do token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role);
      setId(decodedToken.id);
    } else {
        setRole(null);
        setId(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, id, setId}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
