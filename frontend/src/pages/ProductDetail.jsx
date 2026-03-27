import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield, Heart, Check } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/layout/PageTransition';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id)) || PRODUCTS[0];
  
  // Normalizar colores (para que soporte tanto objetos como strings simples)
  const normalizedColors = product.colors.map(c => 
    typeof c === 'object' ? c : { name: c, hex: c, image: product.image }
  );

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(normalizedColors[0]);
  
  // Estado para la imagen principal (Inicia con la del producto o la del primer color)
  const [mainImage, setMainImage] = useState(product.image);

  const { addToCart } = useCart();
  const handleAddToCart = () => {
    // 3. Agrega el producto al estado global
    addToCart(product, selectedSize, selectedColor);

    // Notificación (Mantén tu toast bonito)
    toast.success(`${product.name} agregado`, {
      description: `Color: ${selectedColor.name} - Talla: ${selectedSize}`,
      icon: <Check className="text-green-500 h-5 w-5" />,
      duration: 3000,
    });
  };

  // Efecto: Cuando cambia el color seleccionado, si tiene imagen específica, cámbiala.
  useEffect(() => {
    if (selectedColor.image) {
      setMainImage(selectedColor.image);
    }
  }, [selectedColor]);

  return (
    <PageTransition>
    <div className="bg-white min-h-screen pt-24 pb-16">
      {/* Componente necesario para que se vean las notificaciones */}
      <Toaster position="top-center" richColors />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* COLUMNA IZQUIERDA: Galería */}
          <div className="product-images space-y-4">
            {/* Imagen Principal con Animación al cambiar */}
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={mainImage} // La clave hace que React detecte el cambio y anime
                  src={mainImage} 
                  alt={product.name} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover" 
                />
              </AnimatePresence>
            </div>

            {/* Miniaturas (Thumbnail) */}
            <div className="grid grid-cols-4 gap-4">
               {/* Miniatura de la imagen principal actual */}
               <button 
                 onClick={() => setMainImage(selectedColor.image || product.image)}
                 className={`aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-all ${mainImage === (selectedColor.image || product.image) ? 'border-primary' : 'border-transparent'}`}
               >
                  <img src={selectedColor.image || product.image} className="w-full h-full object-cover" alt="Selected" />
               </button>

               {/* Otras imágenes de la galería */}
               {product.images?.slice(0, 3).map((img, idx) => (
                 <button 
                    key={idx} 
                    onClick={() => setMainImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                 >
                    <img src={img} alt="Detail" className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
              
              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl text-gray-900 font-bold">S/ {product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                   <Star className="h-4 w-4 text-yellow-400 fill-current" />
                   <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                   <span className="text-sm text-gray-400">({product.reviews})</span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Selectores */}
              <div className="mt-8 space-y-6">
                
                {/* Color Selector */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor.name}</span></h3>
                  <div className="flex items-center space-x-3">
                    {normalizedColors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 focus:outline-none flex items-center justify-center transition-all transform hover:scale-110 ${
                          selectedColor.name === color.name ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent hover:border-gray-200'
                        }`}
                        title={color.name}
                      >
                         <div 
                            className="w-10 h-10 rounded-full border border-black/10 shadow-inner" 
                            style={{ backgroundColor: color.hex }}
                         ></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Talla Selector */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Talla: <span className="text-gray-500 font-normal">{selectedSize}</span></h3>
                    <button className="text-sm text-primary hover:text-indigo-600 font-medium underline decoration-dashed">
                        Guía de tallas
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-4">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-4 border rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-white shadow-md'
                            : 'border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botón de Compra */}
                <div className="flex gap-4 mt-8">
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-gray-900 border border-transparent rounded-xl py-4 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-gray-800 focus:outline-none shadow-xl shadow-gray-900/20 transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Agregar al Carrito
                    </button>
                    <button className="p-4 rounded-xl border-2 border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                      <Heart className="w-6 h-6" />
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 border-t border-gray-100 pt-8 space-y-4">
                    <div className="flex items-center text-gray-600 text-sm p-3 bg-gray-50 rounded-lg">
                        <Truck className="w-5 h-5 mr-3 text-primary" />
                        <span>Envío <strong>GRATIS</strong> a todo el Perú (+S/ 150)</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm p-3 bg-gray-50 rounded-lg">
                        <Shield className="w-5 h-5 mr-3 text-primary" />
                        <span>Garantía de calidad. 30 días para cambios.</span>
                    </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
}