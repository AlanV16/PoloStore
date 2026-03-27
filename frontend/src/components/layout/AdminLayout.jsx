import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Resumen' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Pedidos' },
    { path: '/admin/customers', icon: Users, label: 'Clientes' },
    { path: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Fijo */}
      <aside className="w-64 bg-gray-900 text-white fixed inset-y-0 left-0 z-50 flex flex-col">
        <div className="p-6 border-b border-gray-800">
           <h1 className="text-xl font-black tracking-tighter text-white">
             POLO<span className="text-indigo-500">ADMIN</span>
           </h1>
           <p className="text-xs text-gray-400 mt-1">Panel de Control v1.0</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
           {menuItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <Link
                 key={item.path}
                 to={item.path}
                 className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                    isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                 }`}
               >
                 <item.icon className="w-5 h-5 mr-3"/>
                 <span className="font-bold text-sm">{item.label}</span>
               </Link>
             );
           })}
        </nav>

        <div className="p-4 border-t border-gray-800">
            <button className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 rounded-xl transition-colors text-sm font-bold">
                <LogOut className="w-5 h-5 mr-3"/> Salir del Panel
            </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 ml-64 p-8">
         <Outlet /> {/* Aquí se renderizarán las páginas del admin */}
      </main>
    </div>
  );
}