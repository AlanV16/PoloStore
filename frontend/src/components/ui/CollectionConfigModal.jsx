import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag } from 'lucide-react';

export default function CollectionConfigModal({ isOpen, onClose, products, onConfirm }) {
  // Estado para guardar la configuración de cada producto del bundle
  // Estructura: { [productId]: { size: 'M', color: {name: 'Negro', hex...} } }
  const [configs, setConfigs] = useState({});

  // Inicializar configuraciones por defecto cuando se abre
  React.useEffect(() => {
    if (isOpen && products.length > 0) {
      const initialConfig = {};
      products.forEach(p => {
        initialConfig[p.id] = {
          size: p.sizes[0], // Primera talla por defecto
          color: p.colors[0]?.name ? p.colors[0] : { name: 'Estándar', hex: '#000' } // Primer color por defecto
        };
      });
      setConfigs(initialConfig);
    }
  }, [isOpen, products]);

  const handleConfigChange = (productId, field, value) => {
    setConfigs(prev => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value }
    }));
  };

  const handleConfirm = () => {
    // Armamos el "Bundle" final
    const bundleItems = products.map(p => ({
      ...p,
      selectedSize: configs[p.id].size,
      selectedColor: configs[p.id].color
    }));

    onConfirm(bundleItems);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Configura tu Pack</h2>
                <p className="text-sm text-gray-500">Elige la talla y color para cada prenda.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {products.map(product => {
                const currentConfig = configs[product.id] || {};

                return (
                  <div key={product.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-300 transition-colors">
                    {/* Imagen pequeña */}
                    <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg bg-gray-100 mix-blend-multiply" />
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                      
                      <div className="flex flex-wrap gap-4">
                        {/* Selector Talla */}
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Talla</label>
                          <select 
                            value={currentConfig.size}
                            onChange={(e) => handleConfigChange(product.id, 'size', e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 font-medium focus:ring-2 focus:ring-gray-900 outline-none"
                          >
                            {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>

                        {/* Selector Color */}
                        {product.colors && (
                          <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Color</label>
                            <div className="flex gap-2">
                              {product.colors.map((c, idx) => {
                                const colorObj = typeof c === 'object' ? c : { name: c, hex: c };
                                const isSelected = currentConfig.color?.name === colorObj.name;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleConfigChange(product.id, 'color', colorObj)}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-gray-900 scale-110' : 'border-transparent hover:border-gray-200'}`}
                                    title={colorObj.name}
                                  >
                                    <span className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: colorObj.hex }} />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={handleConfirm}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar Pack al Carrito
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}