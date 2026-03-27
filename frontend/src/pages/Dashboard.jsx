import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, Heart, LogOut, Menu, X, Settings, House, MapPin } from 'lucide-react';
import { toast } from 'sonner';

// Importamos los componentes modulares
import OrderDetail from '../components/dashboard/OrderDetail';
import UserProfile from '../components/dashboard/UserProfile';
import Wishlist from '../components/dashboard/Wishlist';
import AddressBook from '../components/dashboard/AddressBook';
import SettingsComponent from '../components/dashboard/Settings';
// Si quieres, puedes extraer OrderList también, pero para simplificar lo dejaré aquí en versión limpia

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders'); 
  const [selectedOrder, setSelectedOrder] = useState(null); // Para navegar al detalle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estado Local (Mock DB)
  const [userProfile, setUserProfile] = useState({ name: 'Juan Pérez', email: 'juan@email.com', address: 'Av. Larco 123', phone: '' });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Cargar datos reales
    const storedOrders = localStorage.getItem('poloStore_orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    // (Aquí podrías cargar el perfil también)
  }, []);

  const handleSaveProfile = (newData) => {
      setUserProfile(newData);
      localStorage.setItem('poloStore_profile', JSON.stringify(newData));
      toast.success("Perfil guardado");
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'orders':
        // VISTA: DETALLE DEL PEDIDO
        if (selectedOrder) {
            return <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
        }
        
        // VISTA: LISTA DE PEDIDOS (Limpia, sin stats cards)
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
             <h2 className="text-2xl font-black text-gray-900 mb-6">Mis Pedidos</h2>
             
             {orders.length === 0 ? (
                 <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                     No hay pedidos recientes.
                 </div>
             ) : (
                 orders.map((order, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedOrder(order)}>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                             <div className="bg-gray-100 p-3 rounded-xl"><Package className="w-6 h-6 text-gray-600"/></div>
                             <div>
                                <p className="font-bold text-gray-900">Pedido #{order.id}</p>
                                <p className="text-xs text-gray-500">{order.date} • {order.items.length} items</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="font-black text-gray-900">S/ {order.total.toFixed(2)}</p>
                             <span className="text-xs font-bold text-indigo-600">Ver Detalles &rarr;</span>
                          </div>
                       </div>
                    </div>
                 ))
             )}
          </motion.div>
        );

      case 'profile':
        return <UserProfile profile={userProfile} onSave={handleSaveProfile} />;

      case 'wishlist':
        return <Wishlist />;

      case 'addressBook':
        return <AddressBook />;
      
      case 'settings':
        return <SettingsComponent />;

      default: return null;
    }
  };

  const menuItems = [
    { id: 'orders', label: 'Mis Pedidos', icon: Package },
    { id: 'profile', label: 'Mi Perfil', icon: User },
    { id: 'wishlist', label: 'Guardados', icon: Heart },
    { id: 'addressBook', label: 'Direcciones', icon: MapPin },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Móvil */}
        <div className="md:hidden flex justify-between items-center mb-6">
           <h1 className="text-2xl font-black text-gray-900">Mi Cuenta</h1>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white rounded-lg border border-gray-200">
              {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* SIDEBAR */}
          <aside className={`w-full md:w-72 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                 <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">{userProfile.name.charAt(0)}</div>
                 <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-900 truncate">{userProfile.name}</p>
                    <p className="text-xs text-gray-500 truncate">{userProfile.email}</p>
                 </div>
              </div>
              <nav className="space-y-2">
                {menuItems.map(item => (
                  <button key={item.id} onClick={() => { setActiveTab(item.id); setSelectedOrder(null); setIsMobileMenuOpen(false); }} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <item.icon className={`w-5 h-5 mr-3`} /> {item.label}
                  </button>
                ))}
                <div className="pt-6 mt-6 border-t border-gray-100">
                    <button className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5 mr-3"/> Cerrar Sesión
                    </button>
                </div>
              </nav>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 w-full min-h-[500px]">
             <AnimatePresence mode="wait">
                 {renderContent()}
             </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}