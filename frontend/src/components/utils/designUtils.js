export const getElementStyle = (el) => {
  const base = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    
    // Transformación unificada
    transform: `translate(${el.x}px, ${el.y}px) translate(-50%, -50%) rotate(${el.rotation || 0}deg)`,
    transformOrigin: 'center center',
    
    // Ancho explícito (Vital para la caja azul)
    width: `${el.width}px`, 
    height: 'auto',
    
    // LÓGICA DE CAPAS: Si tiene zIndex manual úsalo, si no, prioriza la selección
    zIndex: el.zIndex !== undefined ? el.zIndex : (el.isSelected ? 100 : 10),
    
    // Permite saltos de línea (\n)
    whiteSpace: 'pre-wrap',
    cursor: 'grab',
  };

  return base;
};