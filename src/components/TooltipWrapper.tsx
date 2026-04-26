import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState, useId } from 'react';

interface TooltipWrapperProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

/**
 * TooltipWrapper - Componente reutilizável para exibir informações contextuais.
 * Utiliza Framer Motion para animações premium e garante acessibilidade via atributos ARIA.
 */
export const TooltipWrapper = ({ 
  children, 
  content, 
  position = 'top',
  delay = 0.2
}: TooltipWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  // Mapeamento de posições para classes Tailwind
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  };

  // Variantes de animação do Framer Motion
  const variants = {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
      x: position === 'left' ? 10 : position === 'right' ? -10 : 0
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        delay 
      } as const
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      aria-describedby={tooltipId}
    >
      {/* Gatilho do Tooltip */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer flex items-center justify-center font-bold"
      >
        {children}
      </motion.div>

      {/* Conteúdo do Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={`absolute z-[100] px-3 py-1.5 bg-quantic-teal text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm whitespace-nowrap shadow-2xl pointer-events-none ${positionClasses[position]}`}
          >
            {content}
            {/* Seta do Tooltip */}
            <div 
              className={`absolute w-2 h-2 bg-quantic-teal rotate-45 ${
                position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
                position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
                position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
                'left-[-4px] top-1/2 -translate-y-1/2'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
