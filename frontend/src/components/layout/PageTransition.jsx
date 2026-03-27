import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Empieza invisible y un poco abajo
      animate={{ opacity: 1, y: 0 }}  // Termina visible y en su lugar
      exit={{ opacity: 0, y: -20 }}   // (Opcional) Se va hacia arriba
      transition={{ duration: 0.4, ease: "easeOut" }} // Duración suave
      className="w-full"
    >
      {children}
    </motion.div>
  );
}