import React, { useState } from 'react';
import AdminServiceLists from '../components/AdminServiceLists';
import SidebarAdmin from '../components/SidebarAdmin';

const AdminDashboardService: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <SidebarAdmin onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        <AdminServiceLists />
      </div>
    </div>
  );
};

export default AdminDashboardService;
