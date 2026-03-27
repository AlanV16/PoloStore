import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PARTE SUPERIOR: Grid de Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Marca y Newsletter */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
              <span>POLO</span>
              <span className="text-indigo-400">STORE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefiniendo el estilo urbano con tecnología y calidad premium. Diseñado en Lima, para el mundo.
            </p>
            
            <div className="pt-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Suscríbete al Newsletter</h4>
               <div className="flex">
                  <input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="bg-gray-800 border-none text-white text-sm px-4 py-2.5 rounded-l-lg w-full focus:ring-1 focus:ring-indigo-500 outline-none placeholder:text-gray-600"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-r-lg transition-colors">
                     <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>

          {/* Columna 2: Tienda */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
               <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo Completo</Link></li>
               <li><Link to="/collections" className="hover:text-white transition-colors">Nuevas Colecciones</Link></li>
               <li><Link to="/disenador" className="hover:text-white transition-colors flex items-center gap-2">Diseñador 3D <span className="text-[10px] bg-indigo-900 text-indigo-300 px-1.5 py-0.5 rounded">NEW</span></Link></li>
               <li><Link to="/catalogo?filter=ofertas" className="hover:text-white transition-colors">Ofertas Flash</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Ayuda</h4>
            <ul className="space-y-3 text-sm text-gray-400">
               <li><Link to="/dashboard" className="hover:text-white transition-colors">Mi Cuenta</Link></li>
               <li><a href="#" className="hover:text-white transition-colors">Rastrear Pedido</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Guía de Tallas</a></li>
            </ul>
          </div>

          {/* Columna 4: Contacto y Social */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Síguenos</h4>
            <div className="flex gap-4 mb-6">
               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                  <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                  <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                  <Twitter className="w-5 h-5" />
               </a>
            </div>
            
            <div className="text-sm text-gray-400 space-y-2">
               <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> contacto@polostore.com</p>
               <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Garantía de calidad</p>
            </div>
          </div>

        </div>

        {/* PARTE INFERIOR: Legal y Pagos */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs text-gray-500">
              © 2025 Polo Store S.A.C. Todos los derechos reservados.
           </p>
           
           <div className="flex gap-4 items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              {/* Simulamos logos de pago con texto/iconos por ahora */}
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-800 px-2 py-1 rounded">
                 <span className="text-blue-400">VISA</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-800 px-2 py-1 rounded">
                 <span className="text-red-400">MC</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-800 px-2 py-1 rounded">
                 <span className="text-purple-400">YAPE</span>
              </div>
           </div>
        </div>

      </div>
    </footer>
  );
}