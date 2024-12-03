import React, { useState } from 'react';
import AdminSaleLists from '../components/AdminSaleLists';
import SidebarAdmin from '../components/SidebarAdmin';

const AdminDashboardSale: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <SidebarAdmin onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        <AdminSaleLists />
      </div>
    </div>
  );
};

export default AdminDashboardSale;
