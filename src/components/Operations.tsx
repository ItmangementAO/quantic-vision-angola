import { Reveal } from './Reveal';

export const Operations = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with Rig Image - Warm yellow glow as in reference */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dj73nuj5e/image/upload/v1776969357/1-offshore-platform_nbob29.png" 
          alt="Offshore Rig Night" 
          className="w-full h-full object-cover grayscale-[0.2] brightness-[0.7]"
          referrerPolicy="no-referrer"
        />
        {/* Overlay color mapping to the dark petrol/blue but letting the yellow shine through */}
        <div className="absolute inset-0 bg-quantic-petrol/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-b from-quantic-petrol/40 via-transparent to-quantic-petrol"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
            Operamos onde a falha não é <br /> opção.
          </h2>
        </Reveal>
        
        <Reveal>
          <p className="text-white/60 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Comunicação corporativa blindada para cenários de alto risco e elevada exigência no ecossistema petrolífero africano.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
