import React, { useState } from 'react';
import { Lock, Bell, Moon, Trash2, ShieldCheck, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promos: true
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Preferencias actualizadas");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    toast.success("Contraseña actualizada correctamente");
    // Aquí iría la lógica real de cambio de contraseña
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      
      {/* Sección Seguridad */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
         <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldCheck className="w-5 h-5"/></div>
             <h2 className="text-xl font-black text-gray-900">Seguridad</h2>
         </div>
         
         <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
             <div>
                 <label className="text-xs font-bold text-gray-500 uppercase">Contraseña Actual</label>
                 <div className="relative mt-1">
                     <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
                     <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase">Nueva Contraseña</label>
                     <input type="password" placeholder="••••••••" className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase">Repetir Nueva</label>
                     <input type="password" placeholder="••••••••" className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
             </div>
             <button type="submit" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-colors">
                 Actualizar Contraseña
             </button>
         </form>
      </div>

      {/* Sección Notificaciones */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
         <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Bell className="w-5 h-5"/></div>
             <h2 className="text-xl font-black text-gray-900">Notificaciones</h2>
         </div>

         <div className="space-y-4 max-w-lg">
             <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="bg-gray-100 p-2 rounded-lg"><Mail className="w-4 h-4 text-gray-600"/></div>
                     <div>
                         <p className="font-bold text-gray-900 text-sm">Emails de Pedidos</p>
                         <p className="text-xs text-gray-500">Recibe actualizaciones sobre tu compra</p>
                     </div>
                 </div>
                 <button 
                    onClick={() => handleToggle('email')}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.email ? 'bg-green-500' : 'bg-gray-200'}`}
                 >
                     <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
             </div>

             <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                 <div className="flex items-center gap-3">
                     <div className="bg-gray-100 p-2 rounded-lg"><Bell className="w-4 h-4 text-gray-600"/></div>
                     <div>
                         <p className="font-bold text-gray-900 text-sm">Ofertas y Promociones</p>
                         <p className="text-xs text-gray-500">Novedades sobre nuevas colecciones</p>
                     </div>
                 </div>
                 <button 
                    onClick={() => handleToggle('promos')}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.promos ? 'bg-green-500' : 'bg-gray-200'}`}
                 >
                     <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${notifications.promos ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
             </div>
         </div>
      </div>

      {/* Zona de Peligro */}
      <div className="bg-red-50/50 rounded-2xl border border-red-100 p-6 md:p-8 shadow-sm">
         <h3 className="text-sm font-bold text-red-600 uppercase mb-2">Zona de Peligro</h3>
         <p className="text-sm text-gray-600 mb-4">Si eliminas tu cuenta, perderás todo tu historial de pedidos y diseños guardados. Esta acción no se puede deshacer.</p>
         <button className="flex items-center gap-2 text-red-600 font-bold text-sm bg-white border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
             <Trash2 className="w-4 h-4"/> Eliminar mi cuenta
         </button>
      </div>

    </div>
  );
}