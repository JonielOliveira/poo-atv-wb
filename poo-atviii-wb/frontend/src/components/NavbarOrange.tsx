import React from 'react';

interface NavbarOrangeProps {
    title: string; // Adiciona uma prop para o título
}

const NavbarOrange: React.FC<NavbarOrangeProps> = ({ title }) => {
  return (
    <nav className="custom-navbar-orange lighten-1">
      <div className="container">
        <div className="nav-wrapper">
            {title}
        </div>
      </div>
    </nav>
  );
};

export default NavbarOrange;