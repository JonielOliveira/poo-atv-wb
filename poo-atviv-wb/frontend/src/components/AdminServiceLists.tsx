import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import NavbarOrange from './NavbarOrange';
import NavbarTeal from './NavbarTeal';

type Service = {
  _id: string;
  sku: string;
  type: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const AdminServiceLists: React.FC = () => {
  const navigate = useNavigate();
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [activeServices, setActiveServices] = useState<Service[]>([]);
  const [inactiveServices, setInactiveServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    const response = await api.get('/admin/products');
    const filteredAllServices = response.data.filter((item: any) => item.type === 'service');
    setAllServices(filteredAllServices);

    const activeResponse = await api.get('/admin/products/active');
    const filteredActiveServices = activeResponse.data.filter((item: any) => item.type === 'service');
    setActiveServices(filteredActiveServices);

    const inactiveResponse = await api.get('/admin/products/inactive');
    const filteredInactiveServices = inactiveResponse.data.filter((item: any) => item.type === 'service');
    setInactiveServices(filteredInactiveServices);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const editService = (serviceId: string) => {
    navigate(`/admin/services/edit/${serviceId}`);
  };

  const activateService = async (serviceId: string) => {
    try {
      await api.patch(`/admin/products/activate/${serviceId}`);
      await fetchServices();
    } catch (error) {
      console.error('Erro ao ativar o serviço:', error);
    }
  };

  const deactivateService = async (serviceId: string) => {
    try {
      await api.patch(`/admin/products/deactivate/${serviceId}`);
      await fetchServices();
    } catch (error) {
      console.error('Erro ao desativar o serviço:', error);
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      await api.delete(`/admin/products/${serviceId}`);
      await fetchServices();
    } catch (error) {
      console.error('Erro ao excluir o serviço:', error);
    }
  };

  return (
    <div className="container">
      <NavbarOrange title="Dashboard do Administrador: Serviço" />

      <NavbarTeal title="Ativos" />
      <ul className="collection borda">
        {activeServices.map(serv => (
          <li className="collection-item" key={serv._id}>
            <div>
              <strong>{serv.sku} - {serv.name}</strong>
              <div className="secondary-content">
                <button className="btn gray" onClick={() => deactivateService(serv._id)}>Desativar</button>
                <button className="btn blue" onClick={() => editService(serv._id)}>Editar</button>
                <button className="btn deep-orange" onClick={() => deleteService(serv._id)}>Deletar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <NavbarTeal title="Inativos:" />
      <ul className="collection borda">
        {inactiveServices.map(serv => (
          <li className="collection-item" key={serv._id}>
            <div>
              <strong>{serv.sku} - {serv.name}</strong>
              <div className="secondary-content">
                <button className="btn green" onClick={() => activateService(serv._id)}>Ativar</button>
                <button className="btn blue" onClick={() => editService(serv._id)}>Editar</button>
                <button className="btn deep-orange" onClick={() => deleteService(serv._id)}>Deletar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <NavbarTeal title="Todos os Serviços:" />
      <ul className="collection borda">
        {allServices.map(serv => (
          <li className="collection-item" key={serv._id}>
            <strong>{serv.sku} - {serv.name}</strong> - {serv.description} - R$ {serv.price.toFixed(2)} - {serv.quantity}
          </li>
        ))}
      </ul>
      <button className="btn teal" onClick={() => navigate('/admin/services/create')}>Novo Serviço</button>
    </div>
  );
};

export default AdminServiceLists;
