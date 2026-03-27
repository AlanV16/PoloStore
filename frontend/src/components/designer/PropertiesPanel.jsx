import React from 'react';
import { X, Trash2, Plus, Upload, Type, Layers } from 'lucide-react';

// 🎨 NUEVO: Fuentes Disponibles
const FONT_FAMILIES = [
  { name: 'Clásica', value: 'serif', style: 'font-serif' },
  { name: 'Moderna', value: 'sans-serif', style: 'font-sans' },
  { name: 'Impacto', value: 'Impact, sans-serif', style: 'font-mono' },
  { name: 'Cursiva', value: 'Brush Script MT, cursive', style: 'italic' },
  { name: 'Máquina', value: 'Courier New, monospace', style: 'font-mono' },
];

export default function PropertiesPanel({ state, actions, refs }) {
  const { selectedTool, shirtColor, designs, currentView, selectedElementId } = state;
  const activeElement = designs[currentView].find(el => el.id === selectedElementId);
  
  const colors = ['#ffffff', '#171717', '#2563eb', '#dc2626', '#16a34a', '#f59e0b', '#7c3aed', '#57534e'];
  const textColors = ['#000000', '#ffffff', '#dc2626', '#ea580c', '#f59e0b', '#16a34a', '#2563eb', '#7c3aed', '#db2777'];

  return (
    <div className="space-y-6">
      {/* Header Móvil */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100 md:hidden">
         <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">
           {activeElement ? 'EDITAR CAPA' : selectedTool === 'color' ? 'COLOR BASE' : 'HERRAMIENTAS'}
         </h3>
         <button onClick={() => actions.setShowMobilePanel(false)}><X className="w-4 h-4 text-gray-400"/></button>
      </div>

      {/* TOOL: COLOR (Polo) */}
      {selectedTool === 'color' && !activeElement && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
           <p className="text-xs text-gray-500 font-bold uppercase tracking-wide hidden md:block">Color del tejido</p>
           <div className="grid grid-cols-4 gap-3">
             {colors.map((c) => (
               <button 
                key={c} 
                onClick={() => actions.setShirtColor(c)} 
                className={`w-12 h-12 rounded-full shadow-sm transition-transform hover:scale-105 border-2 ${shirtColor === c ? 'border-gray-900 ring-2 ring-gray-100 scale-105' : 'border-gray-200'}`} 
                style={{ backgroundColor: c }} 
                title={c}
               />
             ))}
           </div>
        </div>
      )}

      {/* TOOL: IMAGEN */}
      {selectedTool === 'image' && (
         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
           <input type="file" ref={refs.fileInputRef} onChange={actions.handleImageUpload} accept="image/png, image/jpeg" className="hidden" />
           <button onClick={() => refs.fileInputRef.current.click()} className="w-full py-8 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-indigo-50/50 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 transition-all group">
               <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white group-hover:shadow-md transition-all">
                  <Upload className="w-6 h-6 group-hover:text-primary" />
               </div>
               <span className="text-sm font-bold group-hover:text-primary">Subir Imagen</span>
               <span className="text-[10px] text-gray-400">PNG o JPG sin fondo</span>
           </button>

           {activeElement?.type === 'image' && (
             <div className="space-y-6 pt-4 border-t border-gray-100">
               <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Escala</p>
                  {/* SLIDER CORREGIDO: Calcula el valor basado en el ancho real */}
                  <input 
                      type="range" 
                      min="0.2" 
                      max="2.5" 
                      step="0.1" 
                      value={(activeElement.width || 200) / 200} 
                      onChange={(e) => actions.updateElement(null, 'scale', Number(e.target.value))} 
                      className="w-full accent-gray-900 h-2 bg-gray-200 rounded-lg cursor-pointer" 
                  />
               </div>
               
               {/* CONTROL DE CAPAS */}
               <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Orden de Capas</p>
                  <div className="flex gap-2">
                     <button onClick={() => actions.updateElement(null, 'zIndex', 5)} className="flex-1 py-2 bg-gray-100 rounded-lg text-xs font-bold hover:bg-gray-200 flex items-center justify-center gap-1"><Layers className="w-3 h-3"/> Al Fondo</button>
                     <button onClick={() => actions.updateElement(null, 'zIndex', 100)} className="flex-1 py-2 bg-gray-100 rounded-lg text-xs font-bold hover:bg-gray-200 flex items-center justify-center gap-1"><Layers className="w-3 h-3"/> Al Frente</button>
                  </div>
               </div>

               <button onClick={actions.deleteElement} className="w-full flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4 mr-2"/> ELIMINAR IMAGEN</button>
             </div>
           )}
         </div>
      )}

      {/* TOOL: TEXTO */}
      {selectedTool === 'text' && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
           {activeElement?.type === 'text' ? (
             <>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Contenido</label>
                   <div className="relative">
                      <Type className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        value={activeElement.content} 
                        onChange={(e) => actions.updateElement(null, 'content', e.target.value)} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 p-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-gray-900 outline-none transition-all" 
                        placeholder="Escribe aquí..." 
                      />
                   </div>
                </div>

                {/* SELECTOR DE FUENTE */}
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Tipografía</label>
                   <div className="grid grid-cols-2 gap-2">
                      {FONT_FAMILIES.map(font => (
                          <button
                            key={font.name}
                            onClick={() => actions.updateElement(null, 'font', font.value)}
                            className={`px-3 py-2 rounded-lg text-xs border transition-colors ${activeElement.font === font.value ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-300'}`}
                            style={{ fontFamily: font.value }}
                          >
                             {font.name}
                          </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Tamaño</label>
                      <span className="text-[10px] font-bold text-gray-900">{activeElement.fontSize}px</span>
                   </div>
                   <input type="range" min="10" max="120" value={activeElement.fontSize} onChange={(e) => actions.updateElement(null, 'fontSize', Number(e.target.value))} className="w-full accent-gray-900 h-2 bg-gray-200 rounded-lg cursor-pointer" />
                </div>
                
                {/* CONTROL DE CAPAS TEXTO */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Orden</p>
                  <div className="flex gap-2">
                     <button onClick={() => actions.updateElement(null, 'zIndex', 5)} className="flex-1 py-2 bg-gray-100 rounded-lg text-xs font-bold hover:bg-gray-200">Atrás</button>
                     <button onClick={() => actions.updateElement(null, 'zIndex', 100)} className="flex-1 py-2 bg-gray-100 rounded-lg text-xs font-bold hover:bg-gray-200">Adelante</button>
                  </div>
               </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase">Color</label>
                   <div className="flex flex-wrap gap-2">
                       {textColors.map(c => (
                           <button 
                            key={c} 
                            onClick={() => actions.updateElement(null, 'color', c)} 
                            className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 ${activeElement.color === c ? 'ring-2 ring-offset-1 ring-gray-900 scale-110' : ''}`} 
                            style={{ backgroundColor: c }} 
                           />
                       ))}
                   </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                    <button onClick={actions.deleteElement} className="w-full flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4 mr-2"/> ELIMINAR CAPA
                    </button>
                </div>
             </>
           ) : (
             <button onClick={actions.addText} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95">
                 <Plus className="w-5 h-5" /> Añadir Texto Nuevo
             </button>
           )}
        </div>
      )}
    </div>
  );
}