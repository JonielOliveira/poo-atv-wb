import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';

interface SidebarProps {
    onToggle: (isOpen: boolean) => void;
}

const SidebarAdmin: React.FC<SidebarProps> = ({ onToggle }) => {

    const navigate = useNavigate();
    
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

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.reload();
        // alert('Você saiu da sua conta');
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li><a href="/"><i className="material-icons">store</i>Home</a></li>
                <li><a href="#!"><i className="material-icons">account_box</i>Meus Dados</a></li>
                <li><a href="/admin/products"><i className="material-icons">storage</i>Produtos</a></li>
                <li><a href="/admin/services"><i className="material-icons">storage</i>Serviços</a></li>
                <li><a href="/admin/sales"><i className="material-icons">storage</i>Vendas</a></li>
                <li><a href="/admin/clients"><i className="material-icons">people</i>Clientes</a></li>
                <li className="divider"></li>
                <li><a href="/" onClick={handleLogout}><i className="material-icons">exit_to_app</i>Sair</a></li>
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

export default SidebarAdmin;
