// Importação de componentes e ícones necessários
import { Reveal } from './Reveal';
import { Globe, Activity, CheckCircle2 } from 'lucide-react';

/**
 * Componente Serviços - Detalha as áreas de atuação da Quantic Vision.
 * Dividido em Marketing Tradicional e Digital para uma visão holística.
 */
export const Services = () => {
  // Lista de categorias de serviços e respetivos itens
  const categories = [
    {
      title: "Marketing Tradicional & Média Clássica",
      icon: <Globe className="w-8 h-8" />,
      items: [
        "Planeamento e Aquisição de Média Sectorial",
        "Média de Transmissão (TPA, Rádio Nacional)",
        "Média Exterior (Outdoors, Painéis Digitais)",
        "Produção de Conteúdo Audiovisual Corporativo",
        "Personal Branding para Lideranças C-Level",
        "Produção de Podcasts Corporativos"
      ]
    },
    {
      title: "Marketing Digital & Performance",
      icon: <Activity className="w-8 h-8" />,
      items: [
        "Gestão de Tráfego Pago B2B (Google Ads, LinkedIn Ads)",
        "SEO Técnico especializado em Energia",
        "Gestão de Mídias Sociais (LinkedIn, YouTube, Instagram)",
        "E-mail Marketing & Automação Industrial",
        "Analytics e Dashboards de Performance"
      ]
    }
  ];

  return (
    <section id="servicos" className="py-24 relative bg-quantic-petrol overflow-hidden">
      {/* Imagem de Fundo (Control Room) com overlay azulado */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dj73nuj5e/image/upload/q_auto/f_auto/v1776969360/control-room_oo5mcc.png" 
          alt="Control Room" 
          className="w-full h-full object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-quantic-petrol via-quantic-petrol/80 to-quantic-petrol"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho da Secção de Serviços */}
        <Reveal>
          <div className="mb-20">
            <h5 className="text-quantic-teal text-[13px] font-black uppercase tracking-[0.2em] mb-4">
              Competências Core
            </h5>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Comunicação e Aquisição Multicanal.
            </h2>
          </div>
        </Reveal>

        {/* Grelha de Categorias de Serviços */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <Reveal key={idx}>
              <div className="bg-white/5 border border-white/5 p-10 md:p-14 rounded-sm hover:border-quantic-blue/40 transition-all duration-500 group h-full shadow-quantic-premium">
                
                {/* Título da Categoria com Ícone */}
                <div className="flex items-start gap-6 mb-10">
                  <div className="text-quantic-teal mt-1 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Lista de Itens do Serviço */}
                <ul className="space-y-4">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/60 group/item">
                      <CheckCircle2 size={18} className="text-quantic-teal shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                      <span className="text-sm md:text-base font-medium tracking-tight leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
