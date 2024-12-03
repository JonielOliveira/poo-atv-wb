import React, { useState } from 'react';
import AdminProductLists from '../components/AdminProductLists';
import SidebarAdmin from '../components/SidebarAdmin';

const AdminDashboardProduct: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <SidebarAdmin onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        <AdminProductLists />
      </div>
    </div>
  );
};

export default AdminDashboardProduct;
