'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingProps {
  images: string[];
}

export default function Loading({ images }: LoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Cambia imagen cada 2 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="fixed inset-0 flex items-center justify-center font-sans">
      {/* Carrusel de fondo */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Cargando..."
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay leve usando variables CSS */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      ></div>

      {/* Spinner y texto */}
      <div className="relative z-20 text-center">
        <div
          className="animate-spin rounded-full h-16 w-16 mx-auto mb-4"
          style={{
            borderTop: '4px solid var(--corporate-red)',
            borderRight: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '4px solid transparent',
            borderRadius: '50%',
          }}
        ></div>
        <h2
          className="text-xl font-semibold mb-2"
          style={{ color: 'var(--corporate-red)' }}
        >
          Cargando...
        </h2>
        <p style={{ color: 'var(--text-light)' }}>
          Por favor espera un momento
        </p>
      </div>
    </div>
  );
}
