import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import SidebarAdmin from '../components/SidebarAdmin';

const AdminProductCreate: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Produto salvo com sucesso!');
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <SidebarAdmin onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        {/* <h1>Cadastro de Produto</h1> */}
        {successMessage && <p>{successMessage}</p>}
        <ProductForm onSuccess={handleSuccess} title="Novo Produto" />
      </div>
    </div>
  );
};

export default AdminProductCreate;
