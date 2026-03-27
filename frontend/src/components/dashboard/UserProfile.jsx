import React, { useState } from 'react';
import { User, MapPin, Phone, CreditCard, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function UserProfile({ profile, onSave }) {
  const [formData, setFormData] = useState(profile);
  
  // Estado local para simular tarjetas
  const [cards, setCards] = useState([
      { id: 1, type: 'Visa', last4: '4242', exp: '12/28' },
      { id: 2, type: 'Mastercard', last4: '8899', exp: '01/26' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const removeCard = (id) => {
      setCards(cards.filter(c => c.id !== id));
      toast.success("Tarjeta eliminada");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sección Datos Personales */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
         <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><User className="w-5 h-5"/></div>
             <h2 className="text-xl font-black text-gray-900">Información Personal</h2>
         </div>

         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
               <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
               <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase">Dirección</label>
               <div className="relative">
                   <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
                   <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
               </div>
            </div>
            <div className="md:col-span-2">
                <button type="submit" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-transform active:scale-95 text-sm">Guardar Cambios</button>
            </div>
         </form>
      </div>

      {/* Sección Métodos de Pago (NUEVA) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
         <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CreditCard className="w-5 h-5"/></div>
                <h2 className="text-xl font-black text-gray-900">Métodos de Pago</h2>
             </div>
             <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                 <Plus className="w-4 h-4"/> Agregar
             </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {cards.map(card => (
                 <div key={card.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-gray-900 transition-colors group">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-white text-[10px] font-bold tracking-wider">
                             {card.type.toUpperCase()}
                         </div>
                         <div>
                             <p className="font-bold text-gray-900 text-sm">•••• {card.last4}</p>
                             <p className="text-xs text-gray-400">Vence {card.exp}</p>
                         </div>
                     </div>
                     <button onClick={() => removeCard(card.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                         <Trash2 className="w-4 h-4"/>
                     </button>
                 </div>
             ))}
         </div>
      </div>

    </div>
  );
}