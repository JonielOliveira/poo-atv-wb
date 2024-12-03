import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminDashboardClient from './pages/AdminDashboardClient';
import AdminDashboardProduct from './pages/AdminDashboardProduct';
import AdminProductCreate from './pages/AdminProductCreate';
import AdminProductEdit from './pages/AdminProductEdit';
import UserSignup from './pages/UserSignup';
import ProductForm from './components/ProductForm';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
// Possibilita utilizar os icones do materializecss.com
import 'material-design-icons/iconfont/material-icons.css';
import PageHome from './pages/PageHome';
import UserLogin from './pages/UserLogin';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AdminServiceEdit from './pages/AdminServiceEdit';
import AdminServiceCreate from './pages/AdminServiceCreate';
import AdminDashboardService from './pages/AdminDashboardService';
import AdminDashboardSale from './pages/AdminDashboardSale';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota protegida */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin/clients" element={<AdminDashboardClient />} />
            <Route path="/admin/products/edit/:productId" element={<AdminProductEdit />} />
            <Route path="/admin/products/create" element={<AdminProductCreate />} />
            <Route path="/admin/products" element={<AdminDashboardProduct />} />
            <Route path="/admin/services/edit/:serviceId" element={<AdminServiceEdit />} />
            <Route path="/admin/services/create" element={<AdminServiceCreate />} />
            <Route path="/admin/services" element={<AdminDashboardService />} />
            <Route path="/admin/sales" element={<AdminDashboardSale />} />
          </Route>

          {/* Rota públicas */}
          <Route element={<PublicRoute redirectTo="/" />}>
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/login" element={<UserLogin />} />
          </Route>

          <Route path="/" element={<PageHome />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
