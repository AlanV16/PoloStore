import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CreditCard, Truck, MapPin, ShoppingBag, Smartphone, Lock, User, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal, subtotal, discountAmount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Estilos reutilizables para que todo se vea consistente y pulido
  const inputClasses = "block w-full rounded-xl border-gray-200 bg-gray-50 p-3.5 text-sm font-medium text-gray-900 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 transition-all outline-none placeholder:text-gray-400";
  const labelClasses = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500";

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Tu carrito está vacío</h2>
        <Link to="/catalogo" className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all">
            Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Simple */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/catalogo" className="p-2 bg-white rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Finalizar Compra</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* COLUMNA IZQUIERDA: Formularios */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* 1. DATOS DE IDENTIFICACIÓN */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm">1</div>
                        <h2 className="text-lg font-bold text-gray-900">Datos Personales</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={labelClasses}>Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="email" className={`${inputClasses} pl-11`} placeholder="ejemplo@correo.com" />
                        </div>
                      </div>

                      <div>
                         <label className={labelClasses}>Tipo Documento</label>
                         <div className="relative">
                            <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select className={`${inputClasses} pl-11 appearance-none`}>
                                <option>DNI</option>
                                <option>CE</option>
                                <option>RUC</option>
                            </select>
                         </div>
                      </div>

                      <div>
                        <label className={labelClasses}>N° Documento</label>
                        <input type="text" className={inputClasses} placeholder="00000000" />
                      </div>

                      <div>
                        <label className={labelClasses}>Nombres</label>
                        <input type="text" className={inputClasses} placeholder="Juan" />
                      </div>

                      <div>
                        <label className={labelClasses}>Apellidos</label>
                        <input type="text" className={inputClasses} placeholder="Pérez" />
                      </div>

                      <div className="sm:col-span-2">
                        <label className={labelClasses}>Celular</label>
                        <div className="relative">
                            <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="tel" className={`${inputClasses} pl-11`} placeholder="999 999 999" />
                        </div>
                      </div>
                   </div>
               </div>
            </div>

            {/* 2. DATOS DE ENVÍO */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm">2</div>
                        <h2 className="text-lg font-bold text-gray-900">Dirección de Entrega</h2>
                   </div>

                   <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                      <div>
                        <label className={labelClasses}>Departamento</label>
                        <input type="text" className={inputClasses} placeholder="Ej: Lima" />
                      </div>
                      <div>
                        <label className={labelClasses}>Provincia</label>
                        <input type="text" className={inputClasses} placeholder="Ej: Lima" />
                      </div>
                      <div>
                        <label className={labelClasses}>Distrito</label>
                        <input type="text" className={inputClasses} placeholder="Ej: Miraflores" />
                      </div>
                      <div className="sm:col-span-3">
                        <label className={labelClasses}>Dirección Exacta</label>
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="text" className={`${inputClasses} pl-11`} placeholder="Av. Larco 123, Dpto 401" />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label className={labelClasses}>Referencia (Opcional)</label>
                        <input type="text" className={inputClasses} placeholder="Frente al parque..." />
                      </div>
                   </div>
               </div>
            </div>

            {/* 3. MÉTODO DE PAGO */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm">3</div>
                        <h2 className="text-lg font-bold text-gray-900">Método de Pago</h2>
                   </div>

                   {/* Tabs de Pago */}
                   <div className="grid grid-cols-3 gap-3 mb-6">
                      <button 
                        onClick={() => setPaymentMethod('card')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-900 text-white shadow-md' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                      >
                        <CreditCard className="w-6 h-6 mb-2" />
                        <span className="text-xs font-bold">Tarjeta</span>
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('yape')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'yape' ? 'border-[#742284] bg-[#742284] text-white shadow-md' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                      >
                        <Smartphone className="w-6 h-6 mb-2" />
                        <span className="text-xs font-bold">Yape / Plin</span>
                      </button>

                      <button 
                        onClick={() => setPaymentMethod('mercadopago')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${paymentMethod === 'mercadopago' ? 'border-[#009EE3] bg-[#009EE3] text-white shadow-md' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                      >
                        <ShoppingBag className="w-6 h-6 mb-2" />
                        <span className="text-xs font-bold">MercadoPago</span>
                      </button>
                   </div>

                   {/* Formularios de Pago */}
                   <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 animate-fade-in">
                      {paymentMethod === 'card' && (
                        <div className="space-y-5">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase">Aceptamos</span>
                                <div className="flex gap-2 opacity-80">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                                </div>
                            </div>
                            
                            <div>
                                <label className={labelClasses}>Número de Tarjeta</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type="text" className={`${inputClasses} pl-11`} placeholder="0000 0000 0000 0000" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Vencimiento</label>
                                    <input type="text" className={inputClasses} placeholder="MM/AA" />
                                </div>
                                <div>
                                    <label className={labelClasses}>CVC</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input type="text" className={`${inputClasses} pl-11`} placeholder="123" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}>Titular de la tarjeta</label>
                                <input type="text" className={inputClasses} placeholder="COMO APARECE EN LA TARJETA" />
                            </div>
                        </div>
                      )}

                      {paymentMethod === 'yape' && (
                         <div className="text-center py-4">
                            <div className="w-32 h-32 bg-white mx-auto rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 shadow-sm">
                                <span className="text-gray-400 text-xs font-bold">QR AQUÍ</span>
                            </div>
                            <p className="font-bold text-gray-900">Escanea desde tu app</p>
                            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">El código QR definitivo se generará al confirmar el pedido.</p>
                         </div>
                      )}

                      {paymentMethod === 'mercadopago' && (
                         <div className="text-center py-8">
                            <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
                                <ShieldCheck className="w-8 h-8 text-[#009EE3]" />
                            </div>
                            <p className="font-medium text-gray-900">Continuarás tu compra en Mercado Pago</p>
                            <p className="text-sm text-gray-500 mt-1">Plataforma segura y certificada.</p>
                         </div>
                      )}
                   </div>
               </div>
            </div>

          </section>

          {/* COLUMNA DERECHA: Resumen de Orden */}
          <section className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-28">
              <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Tu Pedido
              </h2>

              <ul className="divide-y divide-gray-50 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => {
                   const isBundle = item.type === 'bundle';
                   const uniqueId = isBundle ? item.bundleId : `${item.id}-${item.selectedSize}`;
                   const imageSrc = isBundle ? item.image : (item.selectedColor?.image || item.image);

                   return (
                    <li key={uniqueId} className="py-4 flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 relative bg-gray-50">
                        <img src={imageSrc} alt={item.name} className="h-full w-full object-cover object-center mix-blend-multiply" />
                        {isBundle && <span className="absolute bottom-0 w-full bg-black text-white text-[8px] text-center font-bold py-0.5 tracking-wider">PACK</span>}
                      </div>

                      <div className="flex flex-1 flex-col justify-center">
                        <div className="flex justify-between text-sm font-bold text-gray-900">
                          <h3 className="line-clamp-2 w-32 leading-tight">{item.name}</h3>
                          <p>S/ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        {isBundle ? (
                             <p className="text-xs text-indigo-600 font-bold mt-1 bg-indigo-50 inline-block px-1.5 py-0.5 rounded">
                               {item.items.length} prendas incluidas
                             </p>
                        ) : (
                             <p className="text-xs text-gray-500 mt-1 font-medium">{item.selectedColor.name} • {item.selectedSize}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">Cant: {item.quantity}</p>
                      </div>
                    </li>
                   );
                })}
              </ul>

              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <p>Subtotal</p>
                  <p>S/ {subtotal.toFixed(2)}</p>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-700 font-bold bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                    <p className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Ahorro Bundle</p>
                    <p>- S/ {discountAmount.toFixed(2)}</p>
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <p className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envío</p>
                  <p className="font-bold text-gray-900">Gratis</p>
                </div>
                
                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center mt-4">
                  <p className="text-base font-bold text-gray-900">Total a Pagar</p>
                  <p className="text-3xl font-black text-gray-900">S/ {cartTotal.toFixed(2)}</p>
                </div>
              </div>

              <button className="mt-8 w-full bg-gray-900 border border-transparent rounded-xl py-4 px-4 flex items-center justify-center text-base font-bold text-white hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-200 shadow-xl shadow-gray-900/10 transition-all active:scale-[0.98] gap-2">
                <Lock className="w-4 h-4" />
                Pagar S/ {cartTotal.toFixed(2)}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                 <ShieldCheck className="w-4 h-4" />
                 <span className="text-[10px] uppercase font-bold tracking-wide">Pago 100% Seguro</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}