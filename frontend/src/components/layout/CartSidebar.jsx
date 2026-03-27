import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { 
    cart, isCartOpen, setIsCartOpen, 
    removeFromCart, updateQuantity, updateSize, 
    cartTotal, subtotal, discountAmount 
  } = useCart();

  const availableSizes = ['S', 'M', 'L', 'XL'];

  // Helper local para generar el ID (debe coincidir con el del Context)
  const getUniqueId = (item) => {
     return item.type === 'bundle' 
        ? item.bundleId 
        : `${item.id}-${item.selectedSize}-${item.selectedColor.name}`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Tu Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">Tu carrito está vacío</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-gray-900 font-bold hover:underline">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const uniqueId = getUniqueId(item); // Generamos ID único aquí

                  // --- RENDERIZADO DE PACK (BUNDLE) ---
                  if (item.type === 'bundle') {
                      return (
                          <div key={uniqueId} className="bg-gray-50 p-4 rounded-xl border border-indigo-100 relative">
                              <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                      <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Pack</span>
                                      <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                                  </div>
                                  <button onClick={() => removeFromCart(uniqueId)} className="text-gray-400 hover:text-red-500">
                                      <Trash2 className="w-4 h-4"/>
                                  </button>
                              </div>
                              
                              <div className="space-y-2 mb-3 pl-2 border-l-2 border-indigo-200">
                                  {item.items.map((subItem, idx) => (
                                      <div key={idx} className="text-xs text-gray-600 flex justify-between">
                                          <span className="truncate max-w-[150px]">{subItem.name}</span>
                                          <span className="font-medium text-gray-900 whitespace-nowrap ml-2">{subItem.selectedSize} / {subItem.selectedColor.name}</span>
                                      </div>
                                  ))}
                              </div>

                              <div className="flex justify-between items-center">
                                  <div className="flex items-center bg-white border border-gray-200 rounded-lg h-7">
                                       <button onClick={() => updateQuantity(uniqueId, -1)} className="px-2 text-gray-600">-</button>
                                       <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                                       <button onClick={() => updateQuantity(uniqueId, 1)} className="px-2 text-gray-600">+</button>
                                  </div>
                                  <div className="text-right">
                                      <span className="block text-[10px] text-gray-400 line-through">S/ {(item.originalPrice * item.quantity).toFixed(2)}</span>
                                      <span className="font-bold text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                              </div>
                          </div>
                      );
                  }

                  // --- RENDERIZADO DE PRODUCTO NORMAL ---
                  // 👇 CORRECCIÓN CRÍTICA: Validar que item.id exista antes de usar toString()
                  const isCustom = item.id && item.id.toString().startsWith('custom-');
                  const imageSrc = isCustom ? item.image : (item.selectedColor?.image || item.image);

                  return (
                    <div key={uniqueId} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                        <img src={imageSrc} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                        {isCustom && (
                          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-white text-[9px] font-bold text-center py-1 uppercase tracking-wide">
                            Diseño Propio
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 pr-4">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(uniqueId)} // 👈 Usamos uniqueId
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="mt-2 flex items-center flex-wrap gap-2 text-sm">
                             <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-gray-200">
                                {item.selectedColor.hex && (
                                   <span className="w-3 h-3 rounded-full border border-gray-300 block" style={{ backgroundColor: item.selectedColor.hex }} />
                                )}
                                <span className="text-xs font-medium text-gray-600">{item.selectedColor.name}</span>
                             </div>

                             <div className="relative">
                                <select 
                                    value={item.selectedSize}
                                    // 👈 La edición de talla sigue usando IDs individuales porque es lógica específica
                                    onChange={(e) => updateSize(item.id, item.selectedSize, item.selectedColor.name, e.target.value)}
                                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold py-1 pl-2 pr-6 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 cursor-pointer"
                                >
                                    {availableSizes.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                             </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                            <button onClick={() => updateQuantity(uniqueId, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-l-lg">-</button>
                            <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(uniqueId, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-r-lg">+</button>
                          </div>
                          <p className="font-bold text-gray-900">S/ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium text-gray-900">S/ {subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                        <div className="flex justify-between items-center text-sm text-green-600">
                            <span className="font-medium">Descuento Bundle (15%)</span>
                            <span className="font-bold">- S/ {discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-black text-gray-900">S/ {cartTotal.toFixed(2)}</span>
                    </div>
                </div>
                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Finalizar Compra
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}