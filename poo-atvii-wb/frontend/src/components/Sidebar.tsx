import React, { useEffect } from 'react';
import M from 'materialize-css';

const Sidebar: React.FC = () => {

    // Inicializando a Sidenav
    useEffect(() => {
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }, []);

    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li><a href="/">Home</a></li>
                <li><a href="#!" className="brand-logo">Admin</a></li>
                <li><a href="/admin/products">Produtos</a></li>
                <li><a href="/admin/clients">Clientes</a></li>
                <li className="divider"></li>
                <li><a href="#!">Sair</a></li>
            </ul>
        <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
        </div> 
    );
};

export default Sidebar;