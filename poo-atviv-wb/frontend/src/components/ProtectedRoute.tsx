import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redireciona para a página de login se o token não estiver presente
    return <Navigate to="/login" />;
  }

  try {
    // Decodifique o payload do token JWT
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));

    // Verifique se o usuário tem o `role` de admin
    if (tokenPayload.role === requiredRole) {
      return <Outlet />; // Renderiza o componente protegido se for admin
    } else {
      // Redireciona para uma página de acesso negado ou outra página desejada
      return <Navigate to="/no-access" />;
    }
  } catch (error) {
    // Redireciona para login se o token for inválido
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
