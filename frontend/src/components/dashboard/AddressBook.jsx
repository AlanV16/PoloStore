import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Home, Briefcase, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AddressBook() {
  const [addresses, setAddresses] = useState([
      { id: 1, type: 'Casa', address: 'Av. Larco 123, Dpto 401', district: 'Miraflores', isDefault: true },
      { id: 2, type: 'Oficina', address: 'Calle Las Begonias 450', district: 'San Isidro', isDefault: false }
  ]);

  const setDefault = (id) => {
      setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
      toast.success("Dirección principal actualizada");
  };

  const removeAddress = (id) => {
      setAddresses(addresses.filter(addr => addr.id !== id));
      toast.success("Dirección eliminada");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">Mis Direcciones</h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                <Plus className="w-4 h-4"/> Nueva Dirección
            </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {addresses.map(addr => (
                <div 
                    key={addr.id} 
                    onClick={() => setDefault(addr.id)}
                    className={`relative border rounded-2xl p-5 cursor-pointer transition-all ${
                        addr.isDefault 
                        ? 'bg-indigo-50/30 border-indigo-200 ring-1 ring-indigo-100' 
                        : 'bg-white border-gray-100 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${addr.type === 'Casa' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                {addr.type === 'Casa' ? <Home className="w-4 h-4"/> : <Briefcase className="w-4 h-4"/>}
                            </div>
                            <span className="font-bold text-gray-900">{addr.type}</span>
                            {addr.isDefault && (
                                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3"/> Principal
                                </span>
                            )}
                        </div>
                        { !addr.isDefault && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); removeAddress(addr.id); }} 
                                className="text-gray-300 hover:text-red-500 p-1"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                        )}
                    </div>
                    
                    <div className="pl-[52px]">
                        <p className="text-gray-900 font-medium">{addr.address}</p>
                        <p className="text-sm text-gray-500">{addr.district}, Lima</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}