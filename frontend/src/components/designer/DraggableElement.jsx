import React, { forwardRef } from 'react';
import { getElementStyle } from '../utils/designUtils';

const DraggableElement = forwardRef(({ element, isSelected, onSelect }, ref) => {
  // Calculamos estilos centralizados
  const style = {
    ...getElementStyle({ ...element, isSelected }),
    // Borde visual solo cuando está seleccionado
    border: isSelected ? '1px solid transparent' : '1px dashed transparent', 
  };

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element);
      }}
      style={style}
      className={`group ${!isSelected ? 'hover:ring-1 hover:ring-blue-300/50' : ''}`}
    >
      {/* Contenido */}
      {element.type === 'text' ? (
        <pre
          className="font-bold text-center leading-none p-2"
          style={{ 
            color: element.color, 
            fontSize: `${element.fontSize}px`, 
            fontFamily: element.font, 
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            margin: 0,
            whiteSpace: 'pre-wrap', // Permite saltos de línea
          }}
        >
          {element.content}
        </pre>
      ) : (
        <img 
          src={element.content} 
          alt="design" 
          className="block"
          style={{ width: '100%', height: 'auto', pointerEvents: 'none' }} 
        />
      )}
    </div>
  );
});

export default DraggableElement;