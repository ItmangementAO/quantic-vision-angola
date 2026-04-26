import { Reveal } from './Reveal';
import { Rss } from 'lucide-react';

export const ContentStrategy = () => {
  const pillars = [
    {
      id: '01',
      title: 'Inovação Tecnológica',
      description: 'Posicionamento como líder de pensamento em tecnologias emergentes do sector.'
    },
    {
      id: '02',
      title: 'Segurança Operacional',
      description: 'Conteúdo HSE que demonstra compromisso com as melhores práticas internacionais.'
    },
    {
      id: '03',
      title: 'Sustentabilidade & RSE',
      description: 'Narrativa de responsabilidade social e impacto positivo nas comunidades locais.'
    }
  ];

  return (
    <section className="py-24 relative bg-quantic-petrol border-t border-white/5 overflow-hidden">
      {/* Background industrial glow - Enhanced to match the "control room" vibe */}
      <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-[800px] h-[800px] bg-quantic-teal/10 rounded-full blur-[160px] pointer-events-none opacity-50"></div>
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-quantic-blue/10 rounded-full blur-[140px] pointer-events-none opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="p-12 md:p-16 border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group rounded-sm shadow-quantic-premium">
          {/* Background image overlay with blur and blue tint */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dj73nuj5e/image/upload/q_auto/f_auto/v1776969360/control-room_oo5mcc.png" 
              alt="Industrial Strategy" 
              className="w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-[3000ms] grayscale"
            />
            <div className="absolute inset-0 bg-quantic-blue/10 backdrop-blur-[2px]"></div>
          </div>
          
          <Reveal>
            <div className="relative z-10 mb-16">
              <div className="flex items-center gap-3 text-quantic-teal mb-6">
                <Rss size={20} />
                <span className="text-[13px] font-black uppercase tracking-[0.2em]">ESTRATÉGIA DE CONTEÚDO</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight max-w-3xl">
                Três Pilares de Conteúdo para o Sector Energético.
              </h2>
              
              <p className="text-white/40 text-lg font-medium leading-relaxed max-w-4xl">
                Toda a comunicação nas redes sociais é construída sobre uma arquitectura estratégica tripartida, desenhada especificamente para o mercado petrolífero angolano e africano.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {pillars.map((p) => (
              <Reveal key={p.id}>
                <div className="p-8 border border-white/5 bg-black/40 hover:border-quantic-teal/30 transition-all duration-500 group/pill overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-quantic-teal/10 blur-2xl opacity-0 group-hover/pill:opacity-100 transition-opacity duration-700"></div>
                  <div className="text-quantic-teal font-mono font-bold text-sm mb-4 relative z-10">{p.id}</div>
                  <h3 className="text-xl font-black text-white mb-4 leading-tight relative z-10">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium relative z-10">
                    {p.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
