import { Reveal } from './Reveal';
import { Play, Shield, Video, Boxes } from 'lucide-react';

export const Audiovisual = () => {
  const services = [
    { icon: <Boxes />, title: "Animações 3D", text: "Representação visual de processos de extracção e refinação." },
    { icon: <Shield />, title: "Segurança (HSE)", text: "Vídeos de indução e protocolos de segurança industrial." },
    { icon: <Video />, title: "Filmes Institucionais", text: "Narrativas cinematográficas para grandes stakeholders." }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="aspect-video glass overflow-hidden group cursor-pointer relative rounded-sm p-2">
                <div className="w-full h-full overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2684&auto=format&fit=crop" 
                    alt="Industrial 3D Animation" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-40 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-quantic-amber/10 border border-quantic-amber/30 backdrop-blur-md rounded-full flex items-center justify-center text-quantic-amber group-hover:bg-quantic-amber group-hover:text-black transition-all duration-500">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-quantic-teal/20 pointer-events-none"></div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <span className="text-quantic-teal font-display text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block underline underline-offset-8">Visual Storytelling</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Produção Audiovisual <br /><span className="text-quantic-amber italic">Técnica</span></h2>
              <p className="text-white/40 font-light leading-relaxed mb-12 text-lg">
                Traduzimos a complexidade da engenharia em conteúdos visuais de alto impacto, garantindo que a sua tecnologia seja compreendida por decisores globais.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {services.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-6 glass hover:bg-white/10 transition-all duration-300 group">
                    <div className="text-quantic-amber group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-[0.2em]">{s.title}</h4>
                      <p className="text-[11px] text-white/30 mt-1">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
