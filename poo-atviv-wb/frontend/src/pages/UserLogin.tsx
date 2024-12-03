import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SidebarUnauthenticated from '../components/SidebarUnauthenticated';

const UserLogin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [consent, setConsent] = useState(false);

  return (
    <div className="row">
      {/* Sidebar */}
      <div className={`col ${isSidebarOpen ? 's3' : 's0'}`}>
        <SidebarUnauthenticated onToggle={setIsSidebarOpen} />
      </div>

      {/* Conteúdo Principal */}
      <div className={`col ${isSidebarOpen ? 's9' : 's12'}`}>
        <LoginForm />
      </div>
    </div>  
  );
};

export default UserLogin;