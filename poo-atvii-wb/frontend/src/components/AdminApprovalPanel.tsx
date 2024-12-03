import React, { useEffect, useState } from 'react';
import api from '../services/api';
import NavbarTeal from './NavbarTeal';
import NavbarOrange from './NavbarOrange';

type User = {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  isApproved: boolean;
};

const AdminApprovalPanel: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await api.get('/auth/users'); // Endpoint para usuários pendentes de aprovação
      setAllUsers(response.data);
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const response = await api.get('/auth/users/pending'); // Endpoint para usuários pendentes de aprovação
      setPendingUsers(response.data);
    };
    fetchPendingUsers();
  }, []);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      const response = await api.get('/auth/users/approved'); // Endpoint para usuários aprovados
      setApprovedUsers(response.data); // Supondo que `setApprovedUsers` seja o estado para os aprovados
    };
    fetchApprovedUsers();
  }, []);
  
  const approveUser = async (userId: string) => {
    try {
      const response = await api.patch('/auth/users/approve', { userId });
      alert(response.data.message); // Exibe uma mensagem de sucesso
      // Atualize a lista de usuários pendentes ou aprovados, conforme necessário
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error);
    }
  };
  
  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete(`/auth/users/${userId}`);
      alert(response.data.message); // Exibe uma mensagem de sucesso
      // Atualize a lista de usuários pendentes conforme necessário
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };
  
  return (
    <div className="container">
      <NavbarOrange title="Dashboard do Administrador: Clientes" />
      
      <NavbarTeal title="Aguardando Aprovação:" />
      <ul className="collection borda">
        {pendingUsers.map(user => (
          <li className="collection-item" key={user._id}>
            <div>
              <strong>{user.email}</strong>
              <div className="secondary-content">
                <button className="btn green" onClick={() => approveUser(user._id)}>Aprovar</button>
                <button className="btn deep-orange" onClick={() => deleteUser(user._id)}>Rejeitar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <NavbarTeal title="Aprovados:" />
      <ul className="collection borda">
        {approvedUsers.map(user => (
          <li className="collection-item" key={user._id}>
            <div>
              <strong>{user.name}</strong> - {user.email} - {user.cpf}
            </div>
          </li>
        ))}
      </ul>

      <NavbarTeal title="Todos:" />
      <ul className="collection borda">
        {allUsers.map(user => (
          <li className="collection-item" key={user._id}>
            <div>
              <strong>{user.name}</strong> - {user.email} - {user.cpf}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default AdminApprovalPanel;
