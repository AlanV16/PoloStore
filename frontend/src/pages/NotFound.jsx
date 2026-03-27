import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 font-sans">
      <div className="text-center max-w-lg">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block mb-8"
        >
          {/* Fondo decorativo */}
          <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white w-24 h-24 rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-gray-100 transform rotate-12">
             <AlertTriangle className="w-10 h-10 text-gray-900" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-black text-gray-900 mb-4 tracking-tighter"
        >
          404
        </motion.h1>

        <motion.h2 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="text-2xl font-bold text-gray-800 mb-4"
        >
          Página no encontrada
        </motion.h2>

        <motion.p 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="text-gray-500 mb-8 leading-relaxed"
        >
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Pero no te preocupes, tenemos muchos estilos esperándote.
        </motion.p>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Volver al Inicio <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}