import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';
import { toPng } from 'html-to-image'; 
import { getElementStyle } from '../utils/designUtils';

export default function PreviewSidebar({ show, onClose, state }) {
  const { addToCart } = useCart();
  const { shirtColor, designs, selectedProduct } = state;
  const shirtImages = selectedProduct ? selectedProduct.images : { front: "/images/polo-front.png", back: "/images/polo-back.png" };
  
  // Refs para capturar la imagen
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFinalAddToCart = async () => {
    if (!frontRef.current) return;
    setIsGenerating(true);

    try {

      const dataUrl = await toPng(frontRef.current, { 
          cacheBust: true, 
          pixelRatio: 1, 
          quality: 0.6, // Calidad JPG media/alta (aunque sea PNG, ayuda en algunos navegadores)
          canvasWidth: 200, // Forzamos ancho pequeño
          canvasHeight: 266, // Forzamos alto proporcional
          backgroundColor: null,
      });

      const customProduct = {
        id: `custom-${Date.now()}`,
        name: `${selectedProduct?.name || 'Polo'} Personalizado`,
        price: 65.00,
        image: dataUrl,
        selectedColor: { name: 'Personalizado', hex: shirtColor },
        selectedSize: 'M',
        designData: designs
      };

      addToCart(customProduct, 'M', { name: 'Custom', hex: shirtColor });
      
      toast.success('¡Diseño agregado al carrito!');
      onClose();
      
    } catch (error) {
      console.error("Error al generar imagen o guardar:", error);
      
      // Fallback de seguridad: Si falla la imagen, guardamos sin imagen
      try {
          const fallbackProduct = {
            id: `custom-err-${Date.now()}`,
            name: `${selectedProduct?.name || 'Polo'} (Diseño Personalizado)`,
            price: 65.00,
            image: shirtImages.front, // Imagen por defecto
            selectedColor: { name: 'Personalizado', hex: shirtColor },
            selectedSize: 'M',
            designData: designs
          };
          addToCart(fallbackProduct, 'M', { name: 'Custom', hex: shirtColor });
          toast.warning('Agregado sin vista previa (Memoria llena)');
          onClose();
      } catch (e) {
         toast.error("Error crítico. Vacía el carrito e intenta de nuevo.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Función de renderizado (IDÉNTICA a la anterior, solo limpiamos props innecesarios)
  const renderPreviewContent = (view) => (
    <div style={{ width: '400px', height: '533px', position: 'relative', backgroundColor: 'transparent' }}>
      <div className="absolute inset-0" style={{ backgroundColor: shirtColor, maskImage: `url(${shirtImages[view]})`, WebkitMaskImage: `url(${shirtImages[view]})`, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center', mixBlendMode: 'multiply' }} />
      <img src={shirtImages[view]} className="absolute inset-0 w-full h-full object-contain mix-blend-multiply pointer-events-none" alt="preview" />
      
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(0)' }}>
        {designs[view].map((el) => {
           const style = getElementStyle({ ...el, isSelected: false });
           return (
             <div key={el.id} style={style}>
                {el.type === 'text' ? (
                  <pre
                    className="font-bold text-center leading-none p-2"
                    style={{ 
                      color: el.color, 
                      fontSize: `${el.fontSize}px`, 
                      fontFamily: el.font, 
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      margin: 0
                    }}
                  >
                    {el.content}
                  </pre>
                ) : (
                  <img src={el.content} alt="design" className="block" style={{ width: '100%', height: 'auto' }} />
                )}
             </div>
           );
        })}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Resumen del Diseño</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-6 w-6 text-gray-500" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50">
              
              {/* Vista Frente */}
              <div className="flex flex-col items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 self-start">Vista Delantera</h3>
                <div className="relative overflow-hidden rounded-xl">
                    <div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', height: '360px' }}> 
                        <div ref={frontRef}>
                            {renderPreviewContent('front')}
                        </div>
                    </div>
                </div>
              </div>

              {/* Vista Trasera */}
              <div className="flex flex-col items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 self-start">Vista Trasera</h3>
                <div className="relative overflow-hidden rounded-xl">
                    <div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', height: '360px' }}> 
                        <div ref={backRef}>
                            {renderPreviewContent('back')}
                        </div>
                    </div>
                </div>
              </div>

            </div>

            <div className="border-t border-gray-100 p-6 bg-white shadow-lg z-20">
              <div className="flex justify-between items-center mb-4"><span className="text-base font-medium text-gray-600">Total</span><span className="text-3xl font-black text-gray-900">S/ 65.00</span></div>
              <button onClick={handleFinalAddToCart} disabled={isGenerating} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-3">
                {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin"/> Procesando...</> : <><ShoppingCart className="w-5 h-5" /> Agregar al Carrito</>}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}