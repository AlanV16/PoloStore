import { useState, useRef, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { toast } from 'sonner';

export const useDesigner = () => {
  // Estados Globales
  const [step, setStep] = useState('selection');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTool, setSelectedTool] = useState('text');
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [currentView, setCurrentView] = useState('front');
  const [zoom, setZoom] = useState(1);
  const [showPreviewSidebar, setShowPreviewSidebar] = useState(false);
  
  // ID del elemento seleccionado
  const [selectedElementId, setSelectedElementId] = useState(null);
  
  // Base de datos de diseños
  const [designs, setDesigns] = useState({ front: [], back: [] });

  const constraintsRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Motion 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (isMobile || zoom > 1.1 || selectedElementId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  // --- ACCIONES ---

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setShirtColor(product.defaultColor);
    setStep('editor');
    
    // Usamos la config del producto o valores por defecto si no existen
    const fontSize = product.config?.initialFontSize || 35;
    const startY = product.config?.initialY || -40;

    setDesigns({ 
        front: [{ 
            id: 1, 
            type: 'text', 
            content: 'EST.\n2026', 
            x: 0, 
            y: startY, // <-- Posición dinámica
            rotation: 0, 
            scale: 1, 
            width: 200, 
            color: product.defaultColor === '#171717' ? '#fff' : '#000', 
            fontSize: fontSize, // <-- Tamaño dinámico
            font: 'sans-serif', 
            zIndex: 10 
        }],
        // ... lo mismo para back
        back: [{
            id: 2, 
            type: 'text', 
            content: 'URBAN\nLEGEND',
            x: 0,
            y: startY, // <-- Posición dinámica
            rotation: 0,
            scale: 1,
            width: 200,
            color: product.defaultColor === '#171717' ? '#fff' : '#000',
            fontSize: fontSize, // <-- Tamaño dinámico
            font: 'sans-serif',
            zIndex: 10
        }] 
    });
  };

  const handleZoom = (increment) => setZoom(prev => Math.min(Math.max(prev + increment, 0.8), 2));
  
  const changeView = (view) => {
    setSelectedElementId(null);
    setCurrentView(view);
  };

  const updateElementPosition = (id, x, y) => {
    setDesigns(prev => ({
      ...prev,
      [currentView]: prev[currentView].map(el => el.id === id ? { ...el, x, y } : el)
    }));
  };

  const updateElementRotation = (id, rotation) => {
    setDesigns(prev => ({
      ...prev,
      [currentView]: prev[currentView].map(el => el.id === id ? { ...el, rotation } : el)
    }));
  };

  // Maneja el redimensionado desde las esquinas azules (Canvas)
  const handleResize = (id, newWidth, drag) => {
    setDesigns(prev => ({
      ...prev,
      [currentView]: prev[currentView].map(el => {
        if (el.id !== id) return el;
        
        const updates = {};
        
        if (drag) {
          updates.x = drag.beforeTranslate[0];
          updates.y = drag.beforeTranslate[1];
        }

        if (el.type === 'text') {
           // Si arrastramos la esquina, recalculamos la fuente
           const oldWidth = el.width || 120;
           const scaleFactor = newWidth / oldWidth;
           
           if(scaleFactor > 0 && isFinite(scaleFactor)) {
               updates.fontSize = Math.round(el.fontSize * scaleFactor);
               updates.width = newWidth;
           }
        } else {
           updates.width = newWidth;
        }

        return { ...el, ...updates, scale: 1 };
      })
    }));
  };

  const addText = () => {
    const newText = { id: Date.now(), type: 'text', content: 'NUEVO', x: 0, y: 0, rotation: 0, scale: 1, width: 150, color: shirtColor === '#171717' ? '#ffffff' : '#000000', fontSize: 30, font: 'sans-serif', zIndex: 20 };
    setDesigns(prev => ({ ...prev, [currentView]: [...prev[currentView], newText] }));
    setSelectedElementId(newText.id); setSelectedTool('text'); setShowMobilePanel(true);
  };

  // 🔥 UPDATE ELEMENT INTELIGENTE (Para el Panel)
  const updateElement = (id, key, value) => {
    const targetId = id || selectedElementId;
    if (!targetId) return;

    setDesigns(prev => ({
      ...prev,
      [currentView]: prev[currentView].map(el => {
        if (el.id !== targetId) return el;
        
        let updates = { [key]: value };

        // 1. Si cambiamos TAMAÑO DE TEXTO (Slider) -> Ajustamos el ANCHO de la caja
        if (key === 'fontSize' && el.type === 'text') {
           // Estimación: caracteres * tamaño * 0.6 (factor promedio de ancho de fuente) + padding
           const charLength = el.content.length || 1;
           // Calculamos un nuevo ancho aproximado para que la caja azul crezca
           const estimatedWidth = Math.max(Math.ceil(charLength * (value * 0.6)) + 20, 50); 
           updates.width = estimatedWidth;
        }
        
        // 2. Si cambiamos ESCALA DE IMAGEN (Slider) -> Ajustamos ANCHO real
        if (key === 'scale' && el.type === 'image') {
           // Base 200px * escala del slider
           updates.width = Math.round(200 * value);
           // Borramos 'scale' para no guardar basura, ya usamos width
           delete updates.scale; 
        }

        return { ...el, ...updates };
      })
    }));
  };

  const deleteElement = () => {
    if (!selectedElementId) return;
    setDesigns(prev => ({ ...prev, [currentView]: prev[currentView].filter(el => el.id !== selectedElementId) }));
    setSelectedElementId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = { id: Date.now(), type: 'image', content: event.target.result, x: 0, y: 0, scale: 1, rotation: 0, width: 200, zIndex: 20 };
        setDesigns(prev => ({ ...prev, [currentView]: [...prev[currentView], newImage] }));
        setSelectedElementId(newImage.id); setSelectedTool('image');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Solo imágenes PNG o JPG.');
    }
  };

  return {
    state: { step, selectedProduct, selectedTool, showMobilePanel, shirtColor, currentView, zoom, showPreviewSidebar, designs, selectedElementId, isMobile },
    refs: { constraintsRef, fileInputRef },
    motion: { rotateX, rotateY, handleMouseMove, handleMouseLeave },
    actions: { 
      selectProduct, setStep,
      setSelectedTool, setShowMobilePanel, setShirtColor, 
      setCurrentView: changeView, 
      setShowPreviewSidebar, setSelectedElementId,
      handleZoom, updateElementPosition, updateElementRotation, handleResize, 
      addText, updateElement, deleteElement, handleImageUpload 
    }
  };
};