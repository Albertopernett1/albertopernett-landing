import React, { useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  // Manejar la tecla Escape para cerrar el modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Agregar event listener cuando el modal está abierto
      document.addEventListener('keydown', handleEscapeKey);
      // Prevenir scroll en el body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Restaurar scroll cuando el modal se cierra
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // No renderizar nada si isOpen es false
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay - fondo oscuro semitransparente */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose} // Cerrar al hacer clic fuera del modal
      />
      
      {/* Contenedor del modal - cuadro blanco redondeado con sombra */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
        {/* Contenido del modal */}
        <div className="text-center">
          {/* Mensaje en texto grande */}
          <p className="text-xl font-medium text-gray-900 mb-6">{message}</p>
          
          {/* Botón "Close" */}
          <button
            onClick={onClose}
            className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
