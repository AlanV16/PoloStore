import React from 'react';

export default function SkeletonProduct() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Imagen Skeleton */}
      <div className="aspect-[4/5] bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
         {/* Brillo decorativo */}
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer" />
      </div>

      {/* Info Skeleton */}
      <div className="flex flex-col gap-2">
        {/* Categoría */}
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
        
        {/* Título (2 líneas simuladas) */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        
        {/* Precio y Botón */}
        <div className="flex justify-between items-center mt-2">
           <div className="h-6 bg-gray-200 rounded w-1/4"></div>
           <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}