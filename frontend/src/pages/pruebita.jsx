import React, { useState, useRef, useEffect } from 'react';
import Moveable from 'react-moveable';
import { 
  Type, Image as ImageIcon, MousePointer2, 
  Download, RotateCcw, Trash2, ChevronLeft, 
  Palette, Upload, Layers, Move 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// --- DATOS DE PRODUCTOS BASE ---
const PRODUCT_TEMPLATES = [
  { id: 'polo', name: 'Polo Clásico', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80', defaultColor: '#ffffff' },
  { id: 'hoodie', name: 'Hoodie Urban', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80', defaultColor: '#1a1a1a' },
  { id: 'shirt', name: 'Camiseta Oversize', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', defaultColor: '#f3f4f6' },
];

const COLORS = [
  { name: 'Blanco', hex: '#ffffff', class: 'bg-white border-gray-200' },
  { name: 'Negro', hex: '#1a1a1a', class: 'bg-gray-900 border-gray-900' },
  { name: 'Rojo', hex: '#ef4444', class: 'bg-red-500 border-red-500' },
  { name: 'Azul', hex: '#3b82f6', class: 'bg-blue-500 border-blue-500' },
  { name: 'Verde', hex: '#22c55e', class: 'bg-green-500 border-green-500' },
  { name: 'Amarillo', hex: '#eab308', class: 'bg-yellow-500 border-yellow-500' },
];

export default function Pruebita() {
  // Estados Globales
  const [step, setStep] = useState('selection'); // 'selection' | 'editor'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productColor, setProductColor] = useState('#ffffff');
  
  // Estados del Diseño
  const [elements, setElements] = useState([]); // Array de capas (textos/imagenes)
  const [selectedTarget, setSelectedTarget] = useState(null); // Elemento seleccionado actualmente
  
  // Referencias para Moveable
  const targetRef = useRef(null);
  const moveableRef = useRef(null);

  // --- HANDLERS DE SELECCIÓN ---
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductColor(product.defaultColor);
    setStep('editor');
  };

  // --- HANDLERS DE ELEMENTOS ---
  const addText = () => {
    const newId = Date.now();
    setElements([...elements, {
      id: newId,
      type: 'text',
      content: 'Doble clic para editar',
      color: '#000000',
      fontSize: 24,
      fontFamily: 'Arial',
      translate: [0, 0],
      rotate: 0,
      scale: [1, 1],
    }]);
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const newId = Date.now();
        setElements([...elements, {
          id: newId,
          type: 'image',
          src: f.target.result,
          translate: [0, 0],
          rotate: 0,
          scale: [1, 1],
          width: 200, // tamaño inicial
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteElement = () => {
    if (selectedTarget) {
      const id = parseInt(selectedTarget.id.replace('el-', ''));
      setElements(elements.filter(el => el.id !== id));
      setSelectedTarget(null);
      toast.error('Elemento eliminado');
    }
  };

  // --- RENDERIZADO CONDICIONAL ---

  // 1. PANTALLA DE SELECCIÓN
  if (step === 'selection') {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Polo Studio™</h1>
            <p className="text-lg text-gray-500">Selecciona tu lienzo y comienza a crear.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCT_TEMPLATES.map((prod) => (
              <motion.div 
                key={prod.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer group border border-gray-100"
                onClick={() => handleSelectProduct(prod)}
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{prod.name}</h3>
                  <button className="text-indigo-600 font-bold text-sm uppercase tracking-wider group-hover:text-indigo-800">
                    Diseñar Ahora &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. EDITOR PRINCIPAL
  return (
    <div className="h-screen flex flex-col pt-20 bg-gray-100 overflow-hidden font-sans">
      
      {/* HEADER DEL EDITOR */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setStep('selection')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
             <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-bold text-gray-900">{selectedProduct.name}</h2>
            <p className="text-xs text-gray-500">Modo Edición</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
             onClick={handleDeleteElement} 
             className={`p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors ${!selectedTarget && 'opacity-50 cursor-not-allowed'}`}
             disabled={!selectedTarget}
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-black transition-all">
            <Download className="w-4 h-4" /> Finalizar Diseño
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR DE HERRAMIENTAS (IZQUIERDA) */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6 z-20 shadow-sm">
          <ToolButton icon={Palette} label="Color" onClick={() => {}} isActive={true} />
          <ToolButton icon={Type} label="Texto" onClick={addText} />
          <label className="cursor-pointer flex flex-col items-center gap-1 group">
             <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Upload className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
             </div>
             <span className="text-[10px] font-bold text-gray-500">Subir</span>
             <input type="file" accept="image/*" className="hidden" onChange={addImage} />
          </label>
        </div>

        {/* ÁREA DE TRABAJO (CENTRO) */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-hidden" 
             onClick={(e) => {
               if(e.target === e.currentTarget) setSelectedTarget(null);
             }}
        >
          {/* LIENZO DE LA PRENDA */}
          <div className="relative w-[500px] h-[600px] bg-white shadow-2xl rounded-sm overflow-hidden select-none">
             
             {/* 1. IMAGEN BASE (Con efecto de tinte para el color) */}
             <div className="absolute inset-0">
                <img 
                  src={selectedProduct.image} 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  style={{ filter: 'grayscale(100%)' }} // Truco para teñir mejor
                  alt="base" 
                />
                {/* Capa de Color (Overlay) */}
                <div 
                  className="absolute inset-0 mix-blend-multiply pointer-events-none" 
                  style={{ backgroundColor: productColor }} 
                />
             </div>

             {/* 2. CAPA DE DISEÑO (Aquí van los elementos) */}
             <div className="absolute inset-0 z-10 overflow-hidden">
                {/* Zona segura de impresión (Borde punteado opcional) */}
                <div className="absolute top-[20%] left-[25%] w-[50%] h-[50%] border-2 border-dashed border-gray-300/50 pointer-events-none rounded-lg flex items-center justify-center">
                   {elements.length === 0 && <span className="text-gray-400 text-xs font-bold opacity-50">Zona de Diseño</span>}
                </div>

                {elements.map((el) => (
                  <div
                    key={el.id}
                    id={`el-${el.id}`}
                    className="absolute cursor-move inline-block"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTarget(e.currentTarget);
                    }}
                    style={{
                      transform: `translate(${el.translate[0]}px, ${el.translate[1]}px) rotate(${el.rotate}deg) scale(${el.scale[0]}, ${el.scale[1]})`,
                      width: el.type === 'image' ? el.width : 'auto',
                    }}
                  >
                    {el.type === 'text' ? (
                      <p 
                        style={{ color: el.color, fontSize: el.fontSize, fontFamily: el.fontFamily }}
                        className="font-bold leading-none whitespace-nowrap drop-shadow-sm select-none"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {el.content}
                      </p>
                    ) : (
                      <img src={el.src} className="w-full h-auto pointer-events-none select-none" alt="upload" />
                    )}
                  </div>
                ))}

                {/* COMPONENTE MOVEABLE (EL RECUADRO MÁGICO) */}
                <Moveable
                  target={selectedTarget}
                  container={null}
                  origin={false}
                  
                  /* Arrastrar */
                  draggable={true}
                  onDrag={({ target, transform }) => {
                    target.style.transform = transform;
                  }}
                  
                  /* Redimensionar (Escalar) */
                  scalable={true}
                  keepRatio={true}
                  renderDirections={["nw", "ne", "se", "sw"]} // Solo esquinas
                  onScale={({ target, transform }) => {
                    target.style.transform = transform;
                  }}
                  
                  /* Rotar */
                  rotatable={true}
                  onRotate={({ target, transform }) => {
                    target.style.transform = transform;
                  }}

                  /* Snapping (Guías magnéticas) */
                  snappable={true}
                  snapDirections={{ center: true, middle: true }}
                />

             </div>
          </div>
        </div>

        {/* PANEL DE PROPIEDADES (DERECHA) */}
        <div className="w-72 bg-white border-l border-gray-200 p-6 z-20 shadow-sm overflow-y-auto">
          
          {/* Selector de Color de Prenda */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Color de Prenda</h3>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setProductColor(c.hex)}
                  className={`w-8 h-8 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${c.class} ${productColor === c.hex ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : ''}`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Propiedades del Elemento Seleccionado */}
          {selectedTarget ? (
             <div className="animate-fade-in-up">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                   <Layers className="w-4 h-4 text-indigo-600" />
                   <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Capa Seleccionada</h3>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Usa las esquinas azules en el diseño para redimensionar o rotar.
                </p>

                {/* Aquí podrías agregar inputs numéricos finos si quisieras */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                   <div className="flex justify-between text-xs text-gray-500">
                      <span>Rotación</span>
                      <span>0°</span>
                   </div>
                </div>

             </div>
          ) : (
            <div className="text-center py-10 opacity-50">
               <MousePointer2 className="w-10 h-10 mx-auto mb-2 text-gray-300" />
               <p className="text-sm text-gray-400 font-medium">Selecciona un elemento para editarlo</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Componente Botón de Herramienta
function ToolButton({ icon: Icon, label, onClick, isActive }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group w-full ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-indigo-50' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}