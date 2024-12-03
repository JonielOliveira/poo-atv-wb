import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  redirectTo: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectTo }) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // Verifica se o token é válido
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      // Se o token for válido e decodificado com sucesso, redireciona o usuário logado
      return <Navigate to={redirectTo} />;
    } catch (error) {
      // Se houver algum problema com o token, considera que o usuário não está logado
      return <Outlet />;
    }
  }

  // Renderiza o conteúdo da rota pública (ex.: página de login)
  return <Outlet />;
};

export default PublicRoute;
