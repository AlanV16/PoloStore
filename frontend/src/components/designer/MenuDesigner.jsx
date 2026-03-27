import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import PageTransition from '../layout/PageTransition';

const PRODUCTS_DB = [
    { 
      id: 'polo', 
      name: 'Polo Clásico', 
      defaultColor: '#ffffff', 
      images: { front: '/images/polo-front.png', back: '/images/polo-back.png' },
      config: { initialFontSize: 35, initialY: -40 } 
    },
    { 
      id: 'hoodie', 
      name: 'Hoodie Oversize', 
      defaultColor: '#1a1a1a', 
      images: { front: '/images/hoodie-front.png', back: '/images/hoodie-back.png' },
      config: { initialFontSize: 35, initialY: -60 } 
    },
];

export default function MenuDesigner({ onSelect }) {
  return (
    <PageTransition>
      {/* 1. Agregamos el estilo 'backgroundImage' para los puntos sutiles (rellena el vacío visual).
         2. Bajamos el padding-top de 'pt-28' a 'pt-20' para subir el contenido.
      */}
      <div 
        className="min-h-screen bg-gray-50 pt-10 pb-12 px-4 flex flex-col items-center relative"
        style={{ 
            backgroundImage: 'radial-gradient(#e5e7eb 3px, transparent 3px)', 
            backgroundSize: '32px 32px' 
        }}
      >
        
        {/* Encabezado más compacto */}
        <div className="text-center mb-8 max-w-2xl z-10">
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-3 block">
                Polo Studio™
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                Elige tu Lienzo
            </h1>
            <p className="text-lg text-gray-500">
                Selecciona el tipo de prenda que deseas personalizar hoy.
            </p>
        </div>
        
        {/* Grid Flexbox centrado */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl z-10">
            {PRODUCTS_DB.map((prod) => (
                <motion.button
                    key={prod.id}
                    whileHover={{ y: -8 }}
                    onClick={() => onSelect(prod)}
                    // Tarjetas con ancho máximo controlado
                    className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center group text-left transition-all hover:shadow-2xl"
                >
                    <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-6 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <img 
                          src={prod.images.front} 
                          alt={prod.name} 
                          className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-110 transition-transform duration-500" 
                        />
                    </div>
                    
                    <div className="w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {prod.name}
                        </h3>
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-sm font-medium text-gray-500">
                                Personalizar &rarr;
                            </span>
                            <span className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors shadow-lg">
                                <ArrowRight className="w-5 h-5"/>
                            </span>
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
        
        <Link to="/" className="mt-12 flex items-center text-gray-400 font-bold hover:text-gray-900 transition-colors z-10">
            <ChevronLeft className="w-5 h-5 mr-1" /> Volver al inicio
        </Link>

      </div>
    </PageTransition>
  );
}