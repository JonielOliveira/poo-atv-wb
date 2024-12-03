import React, { useEffect, useState } from 'react';
import M from 'materialize-css';

interface SidebarUnauthenticatedProps {
    onToggle: (isOpen: boolean) => void;
}

const SidebarUnauthenticated: React.FC<SidebarUnauthenticatedProps> = ({ onToggle }) => {

    useEffect(() => {
        // Inicializando o Sidenav
        const sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
            onOpenStart: () => onToggle(true),
            onCloseEnd: () => onToggle(false)
        });
        
        return () => {
            // Destruir a instância ao desmontar o componente
            sidenav[0].destroy();
        };
    }, [onToggle]);

    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li><a href="/"><i className="material-icons">store</i>Home</a></li>
                <li className="divider"></li>
                <li><a href="/login"><i className="material-icons">person</i>Entrar</a></li>
                <li><a href="/signup"><i className="material-icons">person_add</i>Inscreva-se</a></li>
            </ul>
            <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large">
                {/* <i className="material-icons">menu</i> */}
                <img 
                    src="/assets/icons/logo.png" 
                    alt="menu" 
                    style={{ width: '10%', height: 'auto' }} // ajuste o tamanho conforme necessário
                />
            </a>
        </div>
    );
};

export default SidebarUnauthenticated;
