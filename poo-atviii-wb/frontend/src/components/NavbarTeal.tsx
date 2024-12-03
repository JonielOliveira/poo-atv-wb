import React from 'react';

interface NavbarTealProps {
    title: string; // Adiciona uma prop para o título
}

const NavbarTeal: React.FC<NavbarTealProps> = ({ title }) => {
  return (
    <nav className="custom-navbar-teal lighten-1">
      <div className="container">
        <div className="nav-wrapper">
            {title}
        </div>
      </div>
    </nav>
  );
};

export default NavbarTeal;