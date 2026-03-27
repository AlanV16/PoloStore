import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut } from 'lucide-react';
import Moveable from 'react-moveable';
import DraggableElement from './DraggableElement';

export default function DesignerCanvas({ state, motion: motionLogic, refs, actions }) {
  const { currentView, shirtColor, designs, selectedElementId, zoom, selectedProduct } = state;
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = motionLogic;
  const elementsRefs = useRef(new Map());
  const [target, setTarget] = useState(null);

  // Responsive Scaling
  const containerRef = useRef(null);
  const [responsiveScale, setResponsiveScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const parentHeight = containerRef.current.offsetHeight;
        // Ajustamos para que quepa bien sin bordes blancos
        const scaleW = (parentWidth * 0.85) / 400; // 0.85 da un poco de aire
        const scaleH = (parentHeight * 0.85) / 533;
        setResponsiveScale(Math.min(scaleW, scaleH, 1));
      }
    };
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    if (selectedElementId) {
      setTarget(elementsRefs.current.get(selectedElementId));
    } else {
      setTarget(null);
    }
  }, [selectedElementId, currentView]);

  const currentImage = selectedProduct ? selectedProduct.images[currentView] : "/images/polo-front.png";

  return (
    <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Fondo de puntos sutil para guiar, pero sin caja blanca */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '20px 20px' }}></div>

      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center perspective-container py-4 md:py-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1200px" }}
        onClick={(e) => { if(e.target === e.currentTarget) actions.setSelectedElementId(null); }}
      >
        {/* ENVOLTORIO DE ESCALA */}
        <div style={{ transform: `scale(${responsiveScale})` }}>
            
            {/* 🔥 CAMBIO AQUÍ: Quitamos bg-white y shadow-2xl */}
            <motion.div 
            className="relative origin-center" // Ya no tiene fondo blanco
            style={{ 
                width: '400px',
                height: '533px', 
                rotateX, 
                rotateY,
                scale: zoom,
                transformStyle: "preserve-3d" 
            }}
            >
            {/* Capas del Polo */}
            <div className="absolute inset-0 z-0 transition-colors duration-500" 
                style={{ backgroundColor: shirtColor, maskImage: `url(${currentImage})`, WebkitMaskImage: `url(${currentImage})`, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center', mixBlendMode: 'multiply' }} 
            />
            <img src={currentImage} alt="Shirt" className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none select-none mix-blend-multiply" style={{ filter: 'contrast(1.05)' }} />
            
            {/* Zona de diseño (Invisible pero funcional) */}
            <div className="absolute inset-0 z-20 overflow-hidden" style={{ clipPath: 'inset(0)' }}>
                {designs[currentView].map((el) => (
                <DraggableElement
                    key={el.id}
                    ref={(node) => {
                      if (node) elementsRefs.current.set(el.id, node);
                      else elementsRefs.current.delete(el.id);
                    }}
                    element={el}
                    isSelected={selectedElementId === el.id}
                    onSelect={(element) => {
                      actions.setSelectedElementId(element.id);
                      actions.setSelectedTool(element.type === 'text' ? 'text' : 'image');
                      actions.setShowMobilePanel(true);
                    }}
                />
                ))}

                <Moveable
                    key={selectedElementId || 'no-selection'}
                    target={target}
                    container={null}
                    origin={false}
                    edge={false}
                    draggable={true}
                    throttleDrag={0}
                    onDrag={({ beforeTranslate }) => actions.updateElementPosition(selectedElementId, beforeTranslate[0], beforeTranslate[1])}
                    rotatable={true}
                    throttleRotate={0}
                    onRotate={({ beforeRotate }) => actions.updateElementRotation(selectedElementId, beforeRotate)}
                    resizable={true}
                    keepRatio={true}
                    renderDirections={["nw", "ne", "se", "sw"]}
                    onResize={({ target, width, height, drag }) => {
                        target.style.width = `${width}px`;
                        target.style.height = `${height}px`;
                        target.style.transform = drag.transform; 
                    }}
                    onResizeEnd={({ lastEvent }) => {
                        if (lastEvent) actions.handleResize(selectedElementId, lastEvent.width, lastEvent.drag);
                    }}
                    lineClassName="moveable-line-custom"
                    controlClassName="moveable-control-custom"
                />
            </div>
            </motion.div>
        </div>
      </div>

      {/* Controles Zoom (Igual) */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30 bg-white p-1 rounded-lg shadow-md border border-gray-100">
        <button onClick={() => actions.handleZoom(0.1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded"><ZoomIn className="w-5 h-5"/></button>
        <div className="h-px bg-gray-100 w-full"></div>
        <button onClick={() => actions.handleZoom(-0.1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded"><ZoomOut className="w-5 h-5"/></button>
      </div>
      
      <style>{`
        .moveable-control { border: 2px solid #fff !important; background: #2563eb !important; width: 12px !important; height: 12px !important; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .moveable-line { background: #2563eb !important; height: 2px !important; }
      `}</style>
    </div>
  );
}