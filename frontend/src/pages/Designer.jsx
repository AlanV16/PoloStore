import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Image as ImageIcon, Palette, ShoppingCart, ChevronLeft, Layers } from 'lucide-react';
import { useDesigner } from '../hooks/useDesigner';
import PageTransition from '../components/layout/PageTransition';

// Componentes
import MenuDesigner from '../components/designer/MenuDesigner';
import DesignerCanvas from '../components/designer/DesignerCanvas';
import PropertiesPanel from '../components/designer/PropertiesPanel';
import PreviewSidebar from '../components/designer/PreviewSidebar';

export default function Designer() {
  const { state, refs, motion: motionLogic, actions } = useDesigner();
  const { selectedTool, showMobilePanel, currentView, step, selectedProduct } = state;

  // 1. MODO SELECCIÓN: Mostramos el MenuDesigner
  if (step === 'selection') {
    return <MenuDesigner onSelect={actions.selectProduct} />;
  }

  // 2. MODO EDITOR: La interfaz de diseño completa
  return (
    <PageTransition>
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden font-sans fixed inset-0">
      
      {/* HEADER DEL EDITOR */}
      <div className="h-14 md:h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between z-30 relative shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => actions.setStep('selection')} 
            className="flex items-center text-gray-500 hover:text-gray-900 transition-colors group"
          >
             <ChevronLeft className="w-6 h-6 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" /> 
             <span className="hidden md:inline font-medium ml-1">Volver al Menú</span>
          </button>
          
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
             <button onClick={() => actions.setCurrentView('front')} className={`px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-md transition-all ${currentView === 'front' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>FRENTE</button>
             <button onClick={() => actions.setCurrentView('back')} className={`px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-md transition-all ${currentView === 'back' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>DORSO</button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <span className="hidden md:block font-bold text-gray-900 text-sm">{selectedProduct?.name}</span>
            <button onClick={() => actions.setShowPreviewSidebar(true)} className="px-4 py-1.5 md:px-6 md:py-2 bg-gray-900 text-white rounded-full hover:bg-black font-bold shadow-lg shadow-gray-900/20 text-xs md:text-sm transition-transform active:scale-95 flex items-center">
                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-2" /> 
                <span>S/ 65.00</span>
            </button>
        </div>
      </div>

      {/* AREA DE TRABAJO (CANVAS) */}
      <DesignerCanvas state={state} motion={motionLogic} refs={refs} actions={actions} />

      {/* --- PANELES UI (Escritorio) --- */}
      <div className="hidden md:flex absolute left-6 top-24 bottom-6 w-20 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl flex-col items-center py-6 gap-4 z-40 shadow-xl">
          {[{ id: 'text', icon: Type, label: 'Texto' }, { id: 'image', icon: ImageIcon, label: 'Imagen' }, { id: 'color', icon: Palette, label: 'Color' }].map((tool) => (
            <button key={tool.id} onClick={() => { actions.setSelectedTool(tool.id); actions.setSelectedElementId(null); }} className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${selectedTool === tool.id ? 'bg-gray-900 text-white shadow-lg scale-110' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
              <tool.icon className="w-5 h-5" /> <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">{tool.label}</span>
            </button>
          ))}
      </div>

      <div className="hidden md:block absolute left-32 top-24 w-72 bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl p-5 z-30 shadow-2xl transition-all animate-in slide-in-from-left-4 fade-in duration-500">
          <div className="mb-4 flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">
                  {state.selectedElementId ? 'EDITAR CAPA' : selectedTool === 'color' ? 'COLOR DEL POLO' : 'HERRAMIENTAS'}
              </h3>
          </div>
          <PropertiesPanel state={state} actions={actions} refs={refs} />
      </div>

      {/* --- PANELES UI (Móvil) --- */}
      <div className="md:hidden bg-white border-t border-gray-200 px-6 py-2 pb-6 flex justify-between items-center z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.02)] relative">
         <AnimatePresence>
            {showMobilePanel && (
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute bottom-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 rounded-t-2xl p-5 shadow-2xl">
                 <PropertiesPanel state={state} actions={actions} refs={refs} />
              </motion.div>
            )}
         </AnimatePresence>
         {[{ id: 'color', icon: Palette, label: 'Color' }, { id: 'text', icon: Type, label: 'Texto' }, { id: 'image', icon: ImageIcon, label: 'Imagen' }].map((tool) => (
           <button key={tool.id} onClick={() => { actions.setSelectedTool(tool.id); actions.setShowMobilePanel(true); actions.setSelectedElementId(null); }} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${selectedTool === tool.id && showMobilePanel ? 'text-gray-900' : 'text-gray-400'}`}>
             <tool.icon className={`w-6 h-6 ${selectedTool === tool.id && showMobilePanel ? 'fill-current' : ''}`} /> <span className="text-[10px] font-bold">{tool.label}</span>
           </button>
         ))}
      </div>

      {/* Sidebar de Preview (Carrito) */}
      <PreviewSidebar show={state.showPreviewSidebar} onClose={() => actions.setShowPreviewSidebar(false)} state={state} />

    </div>
    </PageTransition>
  );
}