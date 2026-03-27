import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Home, Grid, Layers, PenTool, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cartCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Manejo del scroll para transparencia
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled && !mobileMenuOpen;
  
  const navClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isTransparent ? 'bg-transparent text-white' : 'bg-white/90 backdrop-blur-md shadow-sm text-gray-900'
  }`;

  const linkClasses = `font-medium transition-colors hover:text-primary ${
    isTransparent ? 'text-gray-200' : 'text-gray-700'
  }`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={navClasses}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-1 group z-50 relative">
              <span className={`transition-colors ${isTransparent ? 'text-white' : 'text-gray-900'}`}>POLO</span>
              <span className="text-primary group-hover:rotate-12 transition-transform duration-300 inline-block">STORE</span>
            </Link>

            {/* Desktop Menu (Hidden on Mobile) */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={linkClasses}>Inicio</Link>
              <Link to="/catalogo" className={linkClasses}>Catálogo</Link>
              <Link to="/collections" className={linkClasses}>Colecciones</Link>
              
              <Link 
                to="/disenador" 
                className="px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-indigo-600 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30"
              >
                Diseñar Ahora
              </Link>
            </div>

            {/* Icons & Mobile Toggle */}
            <div className="flex items-center space-x-4 z-50 relative">
              <button className={`hidden md:block ${isTransparent ? 'text-gray-200' : 'text-gray-600'} hover:text-primary transition-colors`}>
                <Search className="h-5 w-5" />
              </button>
              
              {/* Carrito */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative group cursor-pointer"
              >
                <ShoppingCart className={`h-6 w-6 ${isTransparent ? 'text-gray-200' : 'text-gray-600'} group-hover:text-primary transition-colors`} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link to="/login" className="group relative hidden md:block">
                  <div className={`p-2 rounded-full transition-colors ${isTransparent ? 'hover:bg-white/20' : 'hover:bg-gray-100'}`}>
                      <User className={`h-5 w-5 ${isTransparent ? 'text-gray-200' : 'text-gray-600'} group-hover:text-primary transition-colors`} />
                  </div>
              </Link>

              {/* Botón Hamburguesa Móvil */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className={`md:hidden p-2 rounded-lg transition-colors ${
                   isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MENÚ MÓVIL (OFF-CANVAS) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Oscuro */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setMobileMenuOpen(false)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Panel Deslizable */}
            <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl md:hidden flex flex-col"
            >
               <div className="p-6 pt-24 flex-1 overflow-y-auto">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Navegación</h3>
                  
                  <nav className="space-y-2">
                     <MobileNavLink to="/" icon={Home} label="Inicio" />
                     <MobileNavLink to="/catalogo" icon={Grid} label="Catálogo" />
                     <MobileNavLink to="/collections" icon={Layers} label="Colecciones" />
                     <MobileNavLink to="/disenador" icon={PenTool} label="Diseñador 3D" isSpecial />
                  </nav>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Cuenta</h3>
                     <nav className="space-y-2">
                        <MobileNavLink to="/login" icon={LogIn} label="Iniciar Sesión" />
                        <MobileNavLink to="/register" icon={UserPlus} label="Crear Cuenta" />
                     </nav>
                  </div>
               </div>

               <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-400">© 2025 Polo Store App</p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Componente auxiliar para enlaces móviles limpios
function MobileNavLink({ to, icon: Icon, label, isSpecial }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-3 rounded-xl transition-all ${
         isSpecial 
           ? 'bg-primary text-white font-bold shadow-lg shadow-indigo-200' 
           : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
      }`}
    >
      <Icon className={`w-5 h-5 mr-3 ${isSpecial ? 'text-white' : 'text-gray-400'}`} />
      {label}
    </Link>
  );
}