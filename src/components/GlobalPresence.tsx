import { Reveal } from './Reveal';
import { ChevronRight, Linkedin, Youtube, Instagram, Facebook, ShieldCheck, Briefcase, Camera } from 'lucide-react';

export const GlobalPresence = () => {
  const items = [
    "Curadoria de Eventos e Palestras",
    "Desenvolvimento de Keynotes Exclusivas",
    "Media Training para Executivos",
    "Gestão Integral de Stand",
    "Coverage de Mídia em Tempo Real",
    "Follow-up de Leads Institucionais",
    "Reposicionamento de Conteúdo Pós-Evento"
  ];

  return (
    <section id="presenca-global" className="py-24 bg-quantic-petrol relative overflow-hidden">
      {/* Imagem de Fundo Industrial com overlay denso */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776969356/24_tghvkv.png" 
          alt="Industrial Landscape" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-quantic-petrol/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <Reveal>
              <h5 className="text-quantic-teal text-[11px] font-black uppercase tracking-[0.4em] mb-6">
                PRESENÇA GLOBAL
              </h5>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
                Conferências e <br /> Feiras do Sector.
              </h2>
              <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-lg">
                Dominamos os palcos globais da energia. Da Angola Oil & Gas Conference à OTC Houston, posicionamos a sua marca no centro das grandes decisões.
              </p>
              
              <ul className="space-y-4">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 group">
                    <ChevronRight size={14} className="text-quantic-teal group-hover:translate-x-1 transition-transform" />
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right Column - Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal delay={0.2}>
              <div className="bg-white/5 backdrop-blur-md border border-white/5 p-8 rounded-sm hover:border-quantic-teal/20 transition-all duration-500 shadow-quantic-premium group">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-quantic-teal/10 text-quantic-teal rounded-lg">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-3">Gestão de Eventos e Patrocínios</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                      Transformamos oportunidades de patrocínio estruturados em ferramentas de autoridade. Organização integral de eventos próprios, incluindo webinars técnicos de altíssimo nível.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-white/5 backdrop-blur-md border border-white/5 p-8 rounded-sm hover:border-quantic-teal/20 transition-all duration-500 shadow-quantic-premium group">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-quantic-teal/10 text-quantic-teal rounded-lg">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-3">Marketing de Relacionamento B2B</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                      Desenvolvimento de programas de relacionamento para parceiros estratégicos, integração e gestão de CRM Sectorial, e programas de comunidade local de elevado impacto.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm hover:border-quantic-teal/20 transition-all duration-500 shadow-quantic-premium group">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-quantic-teal/10 text-quantic-teal rounded-lg">
                    <Camera size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-3">Coverage Digital em Tempo Real</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-6">
                      Equipa dedicada em eventos para cobertura fotográfica, videográfica e publicação em tempo real nas redes sociais.
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                      <div className="flex gap-3">
                        <Linkedin size={14} className="text-quantic-teal hover:text-white transition-colors cursor-pointer" />
                        <Youtube size={14} className="text-quantic-teal hover:text-white transition-colors cursor-pointer" />
                        <Instagram size={14} className="text-quantic-teal hover:text-white transition-colors cursor-pointer" />
                      </div>
                      <span className="text-[9px] uppercase font-bold text-white/20 tracking-widest">Publicação simultânea em todas as plataformas</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
