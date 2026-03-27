import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner'; // Asegúrate de importar toast si lo usas

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Inicialización segura
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('poloStore_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- 🔥 EL ESCUDO ANTI-CRASH (FUSIONADO) ---
  useEffect(() => {
    try {
      // Intentamos guardar el carrito normal
      localStorage.setItem('poloStore_cart', JSON.stringify(cart));
    } catch (error) {
      // Si explota por memoria llena (QuotaExceededError)
      if (error.name === 'QuotaExceededError') {
        console.warn("Memoria llena. Guardando versión ligera del carrito (sin imágenes)...");
        
        // Creamos una copia ligera borrando las imágenes pesadas solo para el guardado
        const lightCart = cart.map(item => ({
          ...item,
          image: null // Sacrificamos la imagen para salvar los datos
        }));

        try {
          localStorage.setItem('poloStore_cart', JSON.stringify(lightCart));
        } catch (retryError) {
          console.error("Imposible guardar en localStorage.");
        }
      }
    }
  }, [cart]);

  // --- TU LÓGICA ORIGINAL (Helpers) ---
  const getCartItemId = (item) => {
    if (item.type === 'bundle') return item.bundleId;
    // Agregamos seguridad por si selectedColor es null
    const colorName = item.selectedColor ? item.selectedColor.name : 'Unicolor';
    return `${item.id}-${item.selectedSize}-${colorName}`;
  };

  // --- AGREGAR (TU LÓGICA ORIGINAL RESTAURADA) ---
  const addToCart = (productOrBundle, size = null, color = null) => {
    setCart(prev => {
      let itemToAdd;

      // CASO 1: Es un Bundle
      if (productOrBundle.type === 'bundle') {
          itemToAdd = productOrBundle;
      } 
      // CASO 2: Es un Producto Normal (Custom o Standard)
      else {
          itemToAdd = {
              ...productOrBundle,
              selectedSize: size,
              selectedColor: color
          };
      }

      // Validación de seguridad para evitar items corruptos
      if (!itemToAdd.id) return prev;

      const itemToAddId = getCartItemId(itemToAdd);
      const existingItem = prev.find(i => getCartItemId(i) === itemToAddId);

      if (existingItem) {
        toast.success("Cantidad actualizada");
        return prev.map(i => 
          getCartItemId(i) === itemToAddId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      toast.success("Producto agregado");
      return [...prev, { ...itemToAdd, quantity: 1 }];
    });
    
    setIsCartOpen(true);
  };

  // --- QUITAR ---
  const removeFromCart = (uniqueId) => {
    setCart(prev => prev.filter(item => getCartItemId(item) !== uniqueId));
    toast.error("Producto eliminado");
  };

  // --- ACTUALIZAR CANTIDAD ---
  const updateQuantity = (uniqueId, amount) => {
    setCart(prev => prev.map(item => {
        if (getCartItemId(item) === uniqueId) {
            return { ...item, quantity: Math.max(1, item.quantity + amount) };
        }
        return item;
    }));
  };

  // --- ACTUALIZAR TALLA ---
  const updateSize = (id, oldSize, colorName, newSize) => {
    setCart(prev => prev.map(item => {
        // Verificamos que selectedColor exista para evitar errores
        const itemColorName = item.selectedColor ? item.selectedColor.name : 'Unicolor';
        
        if (item.type !== 'bundle' && item.id === id && item.selectedSize === oldSize && itemColorName === colorName) {
            return { ...item, selectedSize: newSize };
        }
        return item;
    }));
  };

  // --- CÁLCULOS (CON PROTECCIÓN "toFixed" ANTI-ERROR) ---
  // El "|| 0" es lo que evita que salga NaN o undefined y rompa el toFixed
  const subtotal = cart.reduce((total, item) => {
      const unitPrice = item.type === 'bundle' ? (item.originalPrice || 0) : (item.price || 0);
      return total + (unitPrice * (item.quantity || 1));
  }, 0);

  const cartTotal = cart.reduce((total, item) => {
      return total + ((item.price || 0) * (item.quantity || 1));
  }, 0);

  const discountAmount = subtotal - cartTotal;
  const cartCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);
  
  // Limpiar carrito
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, isCartOpen, setIsCartOpen, 
      addToCart, removeFromCart, updateQuantity, updateSize, clearCart,
      cartTotal, cartCount, subtotal, discountAmount 
    }}>
      {children}
    </CartContext.Provider>
  );
};