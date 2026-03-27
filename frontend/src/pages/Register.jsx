import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Facebook, X } from 'lucide-react';

export default function Register() {
  return (
    // CAMBIO 1: min-h-screen y relative
    <div className="min-h-screen flex bg-white flex-row-reverse relative overflow-hidden">
      
      {/* Botón de Escape (A la izquierda en Desktop por diseño, o derecha siempre) */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 lg:left-auto lg:right-6 z-50 p-2 bg-white/50 backdrop-blur-sm hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-all"
        title="Volver al inicio"
      >
        <X className="h-6 w-6" />
      </Link>

      {/* LADO DERECHO: IMAGEN ANIMADA */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
          alt="Register Fashion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end px-12">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="text-white max-w-md text-right"
          >
            <h2 className="text-4xl font-bold mb-4">Únete a la Revolución.</h2>
            <p className="text-lg text-gray-200">Sé parte de la comunidad PoloStore.</p>
          </motion.div>
        </div>
      </motion.div>
      {/* FIN DEL LADO DERECHO ANIMADO */}

      {/* LADO IZQUIERDO: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crear Cuenta</h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿Ya eres miembro?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-indigo-500 transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" placeholder="Nombre Completo" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" placeholder="Correo Electrónico" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input type="password" placeholder="Contraseña" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors" />
            </div>

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none transition-all shadow-lg hover:shadow-xl">
              Registrarme
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">O regístrate con</span></div>
            </div>

            {/* BOTONES SOCIALES (Copiados del Login para consistencia) */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-medium text-gray-700">Google</span>
              </button>

              <button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all gap-2 group">
                <Facebook className="h-5 w-5 text-gray-700 group-hover:text-[#1877F2] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#1877F2] transition-colors">Facebook</span>
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              Al registrarte, aceptas nuestros <a href="#" className="underline">Términos de Servicio</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}