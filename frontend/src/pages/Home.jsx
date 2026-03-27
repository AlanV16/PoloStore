import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, ShoppingCart} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import PageTransition from '../components/layout/PageTransition';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {

  const { addToCart } = useCart();

  return (
    <PageTransition>
    <div className="bg-white overflow-hidden">
      
      {/* HERO SECTION DINÁMICO */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Fondo con Parallax simulado */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        {/* Contenido Hero */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-400" /> Nueva Colección 2025
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Viste tu Imaginación, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Diseña tu Realidad.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            La plataforma líder en personalización textil de alta gama. Algodón Pima peruano y tecnología de impresión digital.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/disenador">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary rounded-full text-white font-bold text-lg shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 transition-colors w-full sm:w-auto"
              >
                Empezar a Diseñar
              </motion.button>
            </Link>
            <Link to="/catalogo">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-bold text-lg hover:bg-white/20 transition-colors w-full sm:w-auto"
              >
                Ver Catálogo
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* SECCIÓN DE PRODUCTOS (GRID ELEGANTE) */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Tendencias de la Semana</h2>
            <p className="text-gray-500 mt-2">Los diseños más votados por la comunidad.</p>
          </div>
          <Link to="/catalogo" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Ver todo <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              variants={fadeInUp}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100"
            >
              {/* Imagen con Zoom suave */}
              <div className="aspect-[4/5] overflow-hidden rounded-t-2xl relative bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay al hacer hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link 
                        to={`/product/${product.id}`}
                        className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-gray-100">
                        Vista Rápida
                    </Link>
                </div>
                {/* Badge de "Nuevo" */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-gray-800">
                  Nuevo
                </div>
              </div>

              {/* Info del producto */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-500 uppercase font-medium tracking-wide">{product.category}</p>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs text-gray-500 font-medium">4.8</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors cursor-pointer">
                  {product.name}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">S/ {product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => {
                      addToCart(product, 'M', { name: 'Estándar', hex: '#000000' });
                      toast.success(`Agregado: ${product.name}`);
                    }}
                    className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECCIÓN "TRUST" */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: "Calidad Premium", desc: "Algodón 100% Peruano" },
                { title: "Envíos Seguros", desc: "A todo el país en 48h" },
                { title: "Garantía Total", desc: "Si no te gusta, lo cambias" }
            ].map((feature, idx) => (
                <div key={idx} className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500">{feature.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}