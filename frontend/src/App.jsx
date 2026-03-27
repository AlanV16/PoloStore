import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/layout/CartSidebar';
import Navbar from './components/layout/Navbar'; // Asegúrate que la ruta sea correcta según tu estructura
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Designer from './pages/Designer';
import Checkout from './pages/Checkout';
import CollectionDetail from './pages/CollectionDetail';
import Collections from './pages/Collections';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/utils/ScrollToTop';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/layout/AdminLayout';
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <CartSidebar /> {/* 👈 El carrito vive aquí, disponible en toda la app */}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/*RUTAS PÚBLICAS (Con Navbar y Footer) */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<CollectionDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          {/*RUTA DE DISEÑADOR (Pantalla Completa - SIN Layout) */}
          <Route path="/disenador" element={<Designer />} />  
          
          {/*RUTAS DE AUTH (Login/Register) */}    
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<div className="p-10 font-bold text-gray-400">Gestión de Pedidos (Próximamente)</div>} />
              <Route path="customers" element={<div className="p-10 font-bold text-gray-400">Clientes (Próximamente)</div>} />
              <Route path="settings" element={<div className="p-10 font-bold text-gray-400">Configuración (Próximamente)</div>} />
          </Route>

          {/*RUTA 404 - NO ENCONTRADO */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;