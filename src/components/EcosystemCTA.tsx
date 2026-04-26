import { Reveal } from './Reveal';
import { Zap, Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { TooltipWrapper } from './TooltipWrapper';

export const EcosystemCTA = () => {
  return (
    <section className="py-32 bg-quantic-petrol relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-10">
            <div className="p-4 bg-quantic-teal/10 text-quantic-teal rounded-full animate-pulse">
              <Zap size={32} className="fill-quantic-teal" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
            Ecossistema Integrado <br /> Quantic
          </h2>
          
          <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-12">
            Na Quantic Vision, não vendemos serviços isolados. Oferecemos um ecossistema integrado de comunicação. Potência, precisão e estratégia para quem lidera o sector.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <TooltipWrapper content="Directo ao Ponto">
              <button className="btn-quantic flex items-center justify-center">
                Iniciar Conversa Estratégica
              </button>
            </TooltipWrapper>
            <TooltipWrapper content="Análise Digital">
              <button className="px-10 py-4 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
                Solicitar Audit de Marca
              </button>
            </TooltipWrapper>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">
              Seguir Quantic Vision:
            </span>
            <div className="flex items-center gap-6">
              <TooltipWrapper content="Network Global">
                <a href="#" className="text-white/30 hover:text-quantic-teal transition-colors"><Linkedin size={18} /></a>
              </TooltipWrapper>
              <TooltipWrapper content="Insights do Sector">
                <a href="#" className="text-white/30 hover:text-quantic-teal transition-colors"><Youtube size={18} /></a>
              </TooltipWrapper>
              <TooltipWrapper content="Vida na Quantic">
                <a href="#" className="text-white/30 hover:text-quantic-teal transition-colors"><Instagram size={18} /></a>
              </TooltipWrapper>
              <TooltipWrapper content="Comunidade Activa">
                <a href="#" className="text-white/30 hover:text-quantic-teal transition-colors"><Facebook size={18} /></a>
              </TooltipWrapper>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
