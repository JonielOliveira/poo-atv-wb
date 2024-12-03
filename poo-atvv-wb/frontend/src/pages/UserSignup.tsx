import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import SidebarUnauthenticated from '../components/SidebarUnauthenticated';

const UserSignup: React.FC = () => {
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
        {/* <h1>Dashboard do Administrador</h1> */}
        <SignupForm consent={consent} setConsent={setConsent} />
      </div>
    </div>  
  );
};

export default UserSignup;