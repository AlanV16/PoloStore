import React from 'react';
import { ArrowLeft, MapPin, CreditCard, Package, Truck, Calendar } from 'lucide-react';

export default function OrderDetail({ order, onBack }) {
  if (!order) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Header con botón volver */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600"/>
        </button>
        <div>
            <h2 className="text-2xl font-black text-gray-900">Pedido #{order.id}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4"/> Realizado el {order.date}
            </div>
        </div>
        <div className="ml-auto">
             <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
             }`}>{order.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
         {/* Dirección */}
         <div className="col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-4 h-4"/> Dirección de Envío
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 leading-relaxed">
                <p className="font-bold text-gray-900">Juan Pérez</p>
                <p>Av. Larco 123, Dpto 401</p>
                <p>Miraflores, Lima</p>
                <p className="mt-2 text-xs text-gray-400">Referencia: Frente al parque</p>
            </div>
         </div>

         {/* Pago */}
         <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                <CreditCard className="w-4 h-4"/> Método de Pago
            </h3>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-6 bg-gray-900 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                <div>
                    <p className="text-sm font-bold text-gray-900">•••• 4242</p>
                    <p className="text-xs text-gray-500">Expira 12/28</p>
                </div>
            </div>
         </div>
      </div>

      {/* Lista de Items */}
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
         <Package className="w-4 h-4"/> Productos
      </h3>
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-8">
         {order.items.map((item, idx) => (
             <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                 <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                     <img src={item.image || '/images/polo-front.png'} alt={item.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                     <p className="font-bold text-gray-900">{item.name}</p>
                     <p className="text-xs text-gray-500">Talla: M • Color: Negro</p>
                 </div>
                 <p className="font-bold text-gray-900">S/ {item.price ? item.price.toFixed(2) : '0.00'}</p>
             </div>
         ))}
      </div>

      {/* Resumen Financiero */}
      <div className="flex justify-end">
          <div className="w-full md:w-80 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>S/ {(order.total - 10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                  <span>Envío <span className="text-xs bg-gray-100 px-1 rounded ml-1">Express</span></span>
                  <span>S/ 10.00</span>
              </div>
              <div className="flex justify-between text-lg font-black text-gray-900 pt-3 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span>S/ {order.total.toFixed(2)}</span>
              </div>
          </div>
      </div>

    </div>
  );
}