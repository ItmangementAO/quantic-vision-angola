// Importações de animação e ícones
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageCircle, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { TooltipWrapper } from './TooltipWrapper';

/**
 * Componente de Botão Flutuante (CTA)
 * Fornece acesso rápido a canais de suporte como WhatsApp e E-mail.
 */
export const FloatingCTA = () => {
  // Estado para controlar a visibilidade das opções de contacto
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3">
      {/* Menu de Opções (apenas visível quando isOpen é true) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-3 mb-2"
          >
            {/* Opção WhatsApp */}
            <TooltipWrapper content="Conversar via WhatsApp" position="left">
              <a 
                href="https://wa.me/244923000000" // Exemplo de link WhatsApp
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-xl shadow-2xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all group"
              >
                WhatsApp <MessageCircle size={18} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
              </a>
            </TooltipWrapper>
            {/* Opção E-mail */}
            <TooltipWrapper content="Enviar E-mail Directo" position="left">
              <a 
                href="mailto:exec@quanticvision.com" 
                className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl shadow-2xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all group"
              >
                E-mail <Mail size={18} className="group-hover:-translate-y-1 transition-transform" />
              </a>
            </TooltipWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Principal */}
      <TooltipWrapper content={isOpen ? "Fechar" : "Contactos Rápidos"} position="left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(33,237,205,0.2)] transition-all duration-500 group ${
            isOpen 
              ? 'bg-white text-black rotate-90' 
              : 'bg-quantic-teal text-black hover:scale-110 hover:shadow-[0_0_60px_rgba(33,237,205,0.4)]'
          }`}
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <div className="relative">
              <MessageCircle size={30} className="group-hover:scale-90 transition-transform" />
              <ExternalLink size={12} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </button>
      </TooltipWrapper>
    </div>
  );
};
