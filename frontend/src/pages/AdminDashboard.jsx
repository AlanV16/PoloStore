import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  // Datos simulados (Mocks)
  const stats = [
    { label: 'Ventas Totales', value: 'S/ 12,450', change: '+15%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Pedidos Nuevos', value: '24', change: '+8%', icon: ShoppingBag, color: 'bg-indigo-500' },
    { label: 'Clientes Activos', value: '1,205', change: '+12%', icon: Users, color: 'bg-orange-500' },
    { label: 'Conversión', value: '3.2%', change: '+1.1%', icon: TrendingUp, color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
           <div>
               <h2 className="text-3xl font-black text-gray-900">Resumen General</h2>
               <p className="text-gray-500">Bienvenido de nuevo, Admin.</p>
           </div>
           <span className="text-sm bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm text-gray-500 font-medium">
               Última actualización: Hoy, 10:30 AM
           </span>
       </div>

       {/* Grid de Estadísticas */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, idx) => (
               <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                   <div className="flex items-start justify-between mb-4">
                       <div>
                           <p className="text-gray-500 text-sm font-bold uppercase">{stat.label}</p>
                           <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                       </div>
                       <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg shadow-gray-200`}>
                           <stat.icon className="w-5 h-5"/>
                       </div>
                   </div>
                   <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                       {stat.change} vs mes anterior
                   </span>
               </div>
           ))}
       </div>

       {/* Gráfico Simulado (Placeholder visual) */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-6">Rendimiento de Ventas</h3>
               <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                   <p className="text-gray-400 font-medium">Gráfico de Ventas (Integración futura)</p>
               </div>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-6">Productos Top</h3>
               <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                           <div className="flex-1">
                               <p className="font-bold text-gray-900 text-sm">Polo Oversize Basic</p>
                               <p className="text-xs text-gray-500">124 ventas</p>
                           </div>
                           <p className="font-bold text-indigo-600"># {i}</p>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    </div>
  );
}