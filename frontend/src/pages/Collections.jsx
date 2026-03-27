
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/mockData';
import PageTransition from '../components/layout/PageTransition';

export default function Collections() {
  return (
    <PageTransition>
    <div className="min-h-screen bg-white font-sans pt-24 pb-12"> {/* pt-24 por el Navbar */}
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Nuestras Colecciones</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Explora nuestras ediciones limitadas y lanzamientos de temporada.
        </p>
      </div>

      {/* Grid de Colecciones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((collection) => (
            <Link 
              key={collection.id} 
              to={`/collections/${collection.id}`} 
              className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 block"
            >
              {/* Imagen de Fondo */}
              <img 
                src={collection.image} 
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Degradado para leer texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Contenido Texto */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                 <h2 className="text-3xl font-black text-white mb-2">
                    {collection.title}
                 </h2>
                 <p className="text-gray-200 text-sm mb-6 max-w-md line-clamp-2">
                    {collection.description}
                 </p>
                 <span className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
                    Ver Colección <ArrowRight className="w-4 h-4" />
                 </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}