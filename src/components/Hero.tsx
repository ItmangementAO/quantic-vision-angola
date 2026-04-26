import { motion } from 'motion/react';
import { ArrowRight, Zap, Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { TooltipWrapper } from './TooltipWrapper';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden hero-gradient">
      {/* Background Image with precise overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776969354/2hero-refinery_oodvy5.png" 
          alt="Oil Refinery Night" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-b from-quantic-petrol/80 via-quantic-petrol/40 to-quantic-petrol"></div>
        <div className="absolute inset-0 industrial-grid opacity-10"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-10">
            <Zap size={14} className="text-quantic-teal fill-quantic-teal" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-quantic-teal">Foco Exclusivo em Angola & África</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold mb-8 leading-[1.05] tracking-tighter text-white">
            Da Tradição à <br />
            <span className="text-quantic-teal">Inovação.</span>
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-white/80 text-lg md:text-xl lg:text-[23px] font-medium mb-12 leading-[1.35]">
              A Conectar o Sector Energético ao Futuro. Agência de marketing B2B exclusiva para líderes, operadores e investidores de alta performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-20">
            <button className="btn-quantic flex items-center gap-3 group">
              Agendar Briefing Estratégico
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/20 text-white px-10 py-5 font-display font-bold text-sm bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-quantic-blue transition-colors">
              Explorar Ecossistema
            </button>
          </div>
        </motion.div>

        {/* Hero Footer Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-12 border-t border-white/10"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Presença Activa em</span>
          <div className="flex flex-wrap items-center gap-10">
            <TooltipWrapper content="Rede de Negócios">
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Linkedin size={18} />
                <span className="text-xs font-bold font-display">LinkedIn</span>
              </div>
            </TooltipWrapper>
            <TooltipWrapper content="Vídeos do Sector">
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Youtube size={18} />
                <span className="text-xs font-bold font-display">YouTube</span>
              </div>
            </TooltipWrapper>
            <TooltipWrapper content="Estilo Quantic">
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Instagram size={18} />
                <span className="text-xs font-bold font-display">Instagram</span>
              </div>
            </TooltipWrapper>
            <TooltipWrapper content="Hub de Notícias">
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Facebook size={18} />
                <span className="text-xs font-bold font-display">Facebook</span>
              </div>
            </TooltipWrapper>
          </div>
        </motion.div>
      </div>

      {/* Extreme background text removed or kept very subtle */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-[0.02] -translate-y-1/2 translate-x-1/4 hidden xl:block">
        <span className="text-[30rem] font-black uppercase leading-none tracking-tighter">Vision</span>
      </div>
    </section>
  );
};
