import React, { useState } from 'react';
import ServiceForm from '../components/ServiceForm';
import SidebarAdmin from '../components/SidebarAdmin';

const AdminServiceCreate: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Serviço salvo com sucesso!');
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <SidebarAdmin onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        {/* <h1>Cadastro de Serviço</h1> */}
        {successMessage && <p>{successMessage}</p>}
        <ServiceForm onSuccess={handleSuccess} title="Novo Serviço" />
      </div>
    </div>
  );
};

export default AdminServiceCreate;