import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingCart, Search, X, Zap } from 'lucide-react'; 
import { PRODUCTS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import PageTransition from '../components/layout/PageTransition';
import SkeletonProduct from '../components/ui/SkeletonProduct';

export default function Catalog() {
  const { addToCart } = useCart();

  // 1. ESTADOS
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200); 
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // 👇 CAMBIO: Iniciamos en 'false' para que no muestre skeletons si los datos ya están ahí
  const [isLoading, setIsLoading] = useState(false); 

  const categories = ['Oversize', 'Slim Fit', 'Hoodies', 'Vintage'];

  // (El useEffect del setTimeout se ha eliminado para carga instantánea)

  // 2. HANDLERS
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault(); 
    addToCart(product, 'M', { name: 'Blanco', hex: '#ffffff' }); 
    toast.success(`Agregado: ${product.name}`);
  };

  // 3. FILTRADO
  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price <= maxPrice;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <PageTransition>
    <div className="bg-white min-h-screen font-sans pt-10">
      
      {/* BANNER */}
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">Catalogo</h1>
            <p className="text-gray-500 font-medium">
              Disponible &bull; {PRODUCTS.length} estilos
            </p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-gray-900 transition-colors" />
            <input 
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-0 rounded-full text-sm font-medium shadow-sm focus:ring-2 focus:ring-gray-900 outline-none transition-all"
            />
            {searchTerm && (
               <button 
                 onClick={() => setSearchTerm('')}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
               >
                 <X className="h-4 w-4" />
               </button>
            )}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR DE FILTROS */}
          <div className={`lg:w-64 flex-shrink-0 space-y-8 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-24 space-y-8"> 
              
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Categorías</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center group cursor-pointer" onClick={() => toggleCategory(cat)}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                        {selectedCategories.includes(cat) && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <span className={`ml-3 text-sm transition-colors select-none ${selectedCategories.includes(cat) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {cat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Precio Máx.</h3>
                  <span className="text-sm font-medium text-gray-900">S/ {maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900" 
                />
              </div>

              {(selectedCategories.length > 0 || maxPrice < 200 || searchTerm) && (
                  <button 
                      onClick={() => { setSelectedCategories([]); setMaxPrice(200); setSearchTerm(''); }}
                      className="w-full py-2 text-xs text-gray-400 hover:text-red-500 font-medium transition-colors hover:underline text-left"
                  >
                      Restablecer filtros
                  </button>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100 hover:border-gray-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <Zap className="h-5 w-5 text-gray-900" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">¿Buscas algo único?</h4>
                  <p className="text-xs text-gray-500 mb-4 px-2 leading-relaxed">
                    Personaliza cada detalle en nuestro editor 3D.
                  </p>
                  <Link to="/disenador">
                    <button className="w-full bg-white border border-gray-200 text-gray-900 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-sm">
                      Ir al Diseñador
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* GRID DE PRODUCTOS */}
          <div className="flex-1">
            
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <button 
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center text-gray-700 font-medium bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm"
              >
                <Filter className="h-4 w-4 mr-2" /> 
                {mobileFiltersOpen ? 'Ocultar' : 'Filtrar'}
              </button>
            </div>

            {isLoading ? (
                // (Opcional) Esto ahora no se mostrará a menos que cambies isLoading a true manualmente
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <SkeletonProduct key={i} />
                    ))}
                </div>
            ) : (
                <>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div 
                              key={product.id}
                              layout 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              className="group bg-white flex flex-col"
                            >
                              <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative mb-4">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover mix-blend-multiply p-4 transition-transform duration-700 group-hover:scale-105"
                                />
                                <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
                                {product.isNew && (
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-20 shadow-sm">
                                        Nuevo
                                    </span>
                                )}
                              </div>
                              
                              <div className="flex flex-col flex-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.category}</span>
                                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors cursor-pointer line-clamp-1">
                                    <Link to={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">S/ {product.price.toFixed(2)}</span>
                                    <button 
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all z-20"
                                        title="Agregar al carrito"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                    </button>
                                </div>
                              </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900">Sin resultados</h3>
                        <p className="mt-1 text-sm text-gray-500">Prueba con otro término.</p>
                        <button 
                            onClick={() => { setSelectedCategories([]); setMaxPrice(200); setSearchTerm(''); }}
                            className="mt-4 text-sm font-bold text-gray-900 underline hover:text-gray-600"
                        >
                            Ver todo
                        </button>
                    </motion.div>
                )}
                </>
            )}

          </div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
}