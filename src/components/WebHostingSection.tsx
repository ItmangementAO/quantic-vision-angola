import { motion } from 'motion/react';
import { Check, Globe, Server, Shield, Zap, ArrowRight, Monitor } from 'lucide-react';
import { Reveal } from './Reveal';

const packages = [
  {
    name: "BÁSICO",
    price: "225.000",
    period: "AO",
    description: "Ideal para presença digital inicial e portfolios.",
    features: [
      "Website Completo SPA (4 Menus)",
      "Hospedagem por 1 Ano",
      "Domínio Personalizado (1 Ano)",
      "Até 2 Modificações/Mês",
      "Suporte 1/7 x4 (1 Mês)"
    ],
    highlight: false,
    icon: <Monitor className="text-quantic-teal" size={24} />
  },
  {
    name: "PROFISSIONAL",
    price: "485.000",
    period: "AO",
    description: "Para empresas que buscam impacto e autoridade.",
    features: [
      "Website Completo (Até 4 Páginas)",
      "Hospedagem por 1 Ano",
      "Domínio Personalizado (1 Ano)",
      "Até 2 Modificações/Mês",
      "Suporte 5/7 x4 (1 Mês)"
    ],
    highlight: true,
    icon: <Zap className="text-quantic-teal" size={24} />
  },
  {
    name: "EMPRESA",
    price: "850.000",
    period: "A PARTIR DE / AO",
    description: "Soluções robustas com sistemas de gestão integrados.",
    features: [
      "Website Totalmente Personalizável",
      "Frontoffice + Backoffice",
      "Hospedagem por 1 Ano",
      "Domínio Personalizado (1 Ano)",
      "Até 2 Modificações/Mês",
      "Suporte 7/7 x4 (1 Mês)"
    ],
    highlight: false,
    icon: <Server className="text-quantic-teal" size={24} />
  }
];

export const WebHostingSection = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-quantic-teal/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-quantic-teal" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-quantic-teal">Ecossistema Digital</span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9] text-white">
                Gestão de <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantic-teal to-quantic-blue">Sites & Hospedagens</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.4}>
            <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.2em] lg:max-w-[300px] leading-loose">
              Infraestrutura de alta performance para impulsionar o seu negócio no mundo digital.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.name} delay={0.1 * index}>
              <motion.div 
                whileHover={{ y: -10 }}
                className={`relative p-10 h-full border ${
                  pkg.highlight 
                    ? 'border-quantic-teal bg-white/[0.03] shadow-[0_0_40px_rgba(33,237,205,0.05)]' 
                    : 'border-white/5 bg-white/[0.01]'
                } overflow-hidden group transition-all duration-500`}
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0 border-r border-t border-white" />
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full" />
                </div>

                <div className="mb-10">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-6 bg-white/5 group-hover:bg-quantic-teal group-hover:text-black transition-colors duration-500">
                    {pkg.icon}
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-display font-black tracking-tighter text-white">{pkg.price}</span>
                    <span className="text-[10px] font-black tracking-widest text-quantic-teal">{pkg.period}</span>
                  </div>
                  <p className="text-white/30 text-[11px] font-bold leading-relaxed uppercase tracking-wider">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-4 mb-12">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="text-quantic-teal mt-0.5" size={14} />
                      <span className="text-xs font-bold text-white/70 uppercase tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a 
                    href="https://wa.me/244923000000" 
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      pkg.highlight 
                        ? 'bg-quantic-teal text-black hover:bg-white' 
                        : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'
                    }`}
                  >
                    Solicitar Orçamento <ArrowRight size={14} />
                  </a>
                </div>
                
                {pkg.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-quantic-teal text-black px-4 py-1 text-[8px] font-black uppercase tracking-[0.3em]">
                    Mais Popular
                  </div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <div className="mt-20 p-8 border border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-quantic-blue/20 flex items-center justify-center">
                <Shield className="text-quantic-blue" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Precisa de algo mais específico?</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Desenvolvemos soluções sob medida para grandes arquitecturas.</p>
              </div>
            </div>
            <a 
              href="mailto:exec@quanticvision.com"
              className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 text-quantic-teal hover:text-white transition-colors group"
            >
              PARA MAIS INFORMAÇÕES ENTRE EM CONTACTO 
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
