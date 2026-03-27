import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../../context/CartContext'; // Para mover directo al carrito

export default function Wishlist() {
  const { addToCart } = useCart();
  
  // Mock Data (En el futuro vendrá de localStorage o Backend)
  const [savedItems, setSavedItems] = useState([
    { id: 1, name: 'Polo Custom "Urban"', price: 65.00, image: '/images/polo-front.png', date: 'Hace 2 días' },
    { id: 2, name: 'Hoodie Black Edition', price: 85.00, image: '/images/hoodie-front.png', date: 'Hace 1 semana' }
  ]);

  const moveToCart = (item) => {
    // Simulamos estructura de producto para el carrito
    const product = {
        id: `wish-${Date.now()}`,
        name: item.name,
        price: item.price,
        image: item.image,
        selectedColor: { name: 'Standard', hex: '#000' },
        selectedSize: 'M',
        type: 'standard'
    };
    addToCart(product, 'M', { name: 'Standard', hex: '#000' });
    toast.success("Movido al carrito");
  };

  const removeItem = (id) => {
    setSavedItems(savedItems.filter(i => i.id !== id));
    toast.success("Eliminado de guardados");
  };

  if (savedItems.length === 0) {
    return (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 animate-in fade-in">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Tu lista está vacía</h3>
            <p className="text-gray-500 mb-6">Guarda tus diseños favoritos para no perderlos.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
       {savedItems.map(item => (
           <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
               <div className="aspect-square bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                   
                   {/* Acciones flotantes */}
                   <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => removeItem(item.id)} className="p-2 bg-white text-red-500 rounded-lg shadow-sm hover:bg-red-50 transition-colors" title="Eliminar">
                           <Trash2 className="w-4 h-4" />
                       </button>
                   </div>
               </div>

               <div>
                   <div className="flex justify-between items-start mb-1">
                       <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                       <span className="text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
                   </div>
                   <p className="text-indigo-600 font-black text-lg mb-4">S/ {item.price.toFixed(2)}</p>
                   
                   <div className="flex gap-2">
                       <button onClick={() => moveToCart(item)} className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
                           <ShoppingBag className="w-4 h-4" /> Agregar
                       </button>
                       <button className="px-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors" title="Editar Diseño">
                           <Edit3 className="w-4 h-4" />
                       </button>
                   </div>
               </div>
           </div>
       ))}
    </div>
  );
}