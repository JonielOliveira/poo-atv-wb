import React, { useEffect, useState } from 'react';
import api from '../services/api';
import NavbarTeal from './NavbarTeal';
import NavbarOrange from './NavbarOrange';

type User = {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  gender: string;
  isApproved: boolean;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  type: string;
};

type Sale = {
  _id: string;
  client: User; // Cliente associado à venda
  product: Product; // Produto associado à venda
  quantity: number;
  totalPrice: number;
};

const AdminSaleLists: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get('/sale/sales'); // Endpoint para listar vendas
        console.log(response.data);
        setSales(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="container">
      <NavbarOrange title="Dashboard do Administrador: Vendas" />

      <NavbarTeal title="Lista de Vendas:" />
      <ul className="collection borda">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <li className="collection-item" key={sale._id}>
              <div>
                <strong>Cliente:</strong>
                <p>
                  Nome: {sale.client.name} <br />
                  CPF: {sale.client.cpf} <br />
                  Email: {sale.client.email} <br />
                  Sexo: {sale.client.gender}
                </p>
                <strong>Produto:</strong>
                <p>
                  Tipo: {sale.product.type} <br />
                  Nome: {sale.product.name} <br />
                  Preço: R$ {sale.product.price.toFixed(2)}
                </p>
                <strong>Venda:</strong>
                <p>
                  Quantidade: {sale.quantity} <br />
                  Total: R$ {sale.totalPrice.toFixed(2)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="center-align">Nenhuma venda encontrada.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminSaleLists;
