import React, { useState, useEffect } from 'react';
import AdminApprovalPanel from '../components/AdminApprovalPanel';
import SidebarAdmin from '../components/SidebarAdmin';
import SidebarUnauthenticated from '../components/SidebarUnauthenticated';
import { useAuth } from '../context/AuthContext';
import Home from '../components/Home';
import SidebarClient from '../components/SidebarClient';

const PageHome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useAuth();

  useEffect(() => {
    // Exemplo 1: Log no console quando o role mudar
    console.log(`O role foi alterado para: ${role}`);
  }, [role]);

  const renderSidebar = () => {
    if (role === 'admin') return <SidebarAdmin onToggle={setIsSidebarOpen} />;
    if (role === 'client') return <SidebarClient onToggle={setIsSidebarOpen} />;
    return <SidebarUnauthenticated onToggle={setIsSidebarOpen} />;
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        {renderSidebar()}
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        <Home />
      </div>
    </div>
  );
};

export default PageHome;
