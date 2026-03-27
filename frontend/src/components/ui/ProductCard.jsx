// src/components/ui/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita navegar si haces clic en el botón
    addToCart(product, 'M', { name: 'Estándar', hex: '#000000' });
    toast.success(`Agregado: ${product.name}`);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }} // Efecto hover sutil
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 flex flex-col h-full"
    >
      {/* Imagen con Zoom suave */}
      <div className="aspect-[4/5] overflow-hidden rounded-t-2xl relative bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Link que cubre toda la imagen */}
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />

        {/* Overlay al hacer hover (Vista Rápida) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Ver Detalles
            </span>
        </div>

        {/* Badge de "Nuevo" */}
        {product.isNew && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-gray-800 z-20">
              Nuevo
            </div>
        )}
      </div>

      {/* Info del producto */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{product.category}</p>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs text-gray-500 font-bold">{product.rating || 4.8}</span>
          </div>
        </div>
        
        <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors cursor-pointer mb-4 line-clamp-1">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">S/ {product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all shadow-sm z-20"
            title="Agregar al carrito"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}