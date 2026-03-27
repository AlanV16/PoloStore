import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import CollectionConfigModal from '../components/ui/CollectionConfigModal';
import PageTransition from '../components/layout/PageTransition';

export default function CollectionDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const collectionInfo = COLLECTIONS.find(c => c.id === slug);
  const collectionProducts = PRODUCTS.filter(p => p.collectionId === slug);

  // Precios
  const totalPrice = collectionProducts.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = totalPrice * 0.85; 

  // Handler del Bundle
  const handleConfirmBundle = (configuredItems) => {
    const uniqueId = Date.now();
    const bundleItem = {
        type: 'bundle',
        id: uniqueId,
        bundleId: uniqueId,
        name: `Pack ${collectionInfo.title}`,
        price: bundlePrice,
        originalPrice: totalPrice,
        image: collectionInfo.image,
        items: configuredItems,
        quantity: 1
    };

    addToCart(bundleItem);
    toast.success('Pack agregado con éxito', {
        icon: <Sparkles className="text-yellow-400 h-5 w-5" />
    });
  };

  if (!collectionInfo) {
    return (
        <div className="min-h-screen pt-32 text-center">
            <h2 className="text-2xl font-bold">Colección no encontrada</h2>
            <Link to="/collections" className="text-blue-600 underline mt-4 block">Volver</Link>
        </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-white font-sans">
      
      {/* Hero Banner Responsive */}
      <div className="relative h-[60vh] md:h-[70vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <img 
          src={collectionInfo.image} 
          alt={collectionInfo.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4 mt-10 max-w-4xl w-full">
           <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
              Limited Drop
           </span>
           
           {/* Título Responsive: Más pequeño en móvil (4xl), gigante en desktop (7xl) */}
           <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight">
              {collectionInfo.title}
           </h1>
           
           <p className="text-base md:text-xl text-gray-200 max-w-xl mx-auto font-medium mb-8 px-4">
              {collectionInfo.description}
           </p>

           {/* 👇 BOTÓN RESPONSIVE */}
           {collectionProducts.length > 0 && (
             <div className="flex flex-col items-center animate-fade-in-up w-full px-4 md:px-0">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group relative w-full md:w-auto bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-sm md:text-lg shadow-2xl hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Comprar el Look</span>
                  
                  {/* Separador y Precio */}
                  <div className="flex flex-col items-start leading-none ml-1 md:ml-2 pl-3 border-l border-gray-300">
                     <span className="text-[10px] md:text-xs text-gray-500 line-through font-medium">S/ {totalPrice.toFixed(2)}</span>
                     <span className="text-sm md:text-base text-gray-900">S/ {bundlePrice.toFixed(2)}</span>
                  </div>
                </button>
                
                <p className="text-gray-400 text-[10px] md:text-xs mt-3 opacity-80">
                   *Configura tus tallas antes de agregar
                </p>
             </div>
           )}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <Link to="/collections" className="inline-flex items-center text-gray-500 hover:text-black mb-8 font-bold text-xs md:text-sm transition-colors uppercase tracking-wide">
           <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Colecciones
        </Link>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {collectionProducts.map(product => (
               <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-medium text-lg">Próximamente nuevos lanzamientos.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <CollectionConfigModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={collectionProducts}
        onConfirm={handleConfirmBundle}
      />

    </div>
  </PageTransition>
  );
}