import { Reveal } from './Reveal';
import { Linkedin, Youtube, Instagram, ChevronRight, Video, Twitter, BarChart3, TrendingUp, Users } from 'lucide-react';
import { TooltipWrapper } from './TooltipWrapper';

export const SocialB2B = () => {
  const platforms = [
    {
      name: "LinkedIn",
      subtitle: "PRINCIPAL CANAL B2B & LEADERSHIP",
      icon: <Linkedin size={24} />,
      color: "text-[#0077b5]",
      bgIcon: "bg-[#0077b5]/10",
      desc: "Posicionamos líderes e empresas energéticas como referências globais junto a decisores C-level, investidores e parceiros estratégicos através de conteúdo técnico denso.",
      items: [
        "Artigos Técnicos de Alta Autoridade (Ghostwriting)",
        "Campanhas LinkedIn Ads segmentadas por cargo e empresa",
        "Gestão de Perfil Executivo (CEO e Diretores)",
        "Curadoria de Conteúdo sobre Inovação & ESG"
      ],
      metrics: [
        { label: "Alcance Médio", value: "+120K" },
        { label: "Engajamento", value: "4.8%" },
        { label: "Impressões/Mês", value: "+500K" }
      ]
    },
    {
      name: "YouTube",
      subtitle: "REFERÊNCIA TÉCNICA EM VÍDEO",
      icon: <Youtube size={24} />,
      color: "text-[#ff0000]",
      bgIcon: "bg-[#ff0000]/10",
      desc: "Produção de conteúdo audiovisual de alta fidelidade que posiciona a empresa como a maior autoridade técnica do setor petrolífero e energético na região.",
      items: [
        "Séries Documentais (Ex: À Descoberta da Operação)",
        "Vídeos Explicativos com Animações 3D de Engenharia",
        "Relatórios de Sustentabilidade e Governança",
        "Webinars Técnicos e Transmissões ao Vivo"
      ],
      metrics: [
        { label: "Visualizações", value: "+80K" },
        { label: "Subscritores", value: "+15K" },
        { label: "Horas Assistidas", value: "+3K" }
      ]
    },
    {
      name: "Instagram",
      subtitle: "EMPLOYER BRANDING & RSE",
      icon: <Instagram size={24} />,
      color: "text-[#e4405f]",
      bgIcon: "bg-[#e4405f]/10",
      desc: "Comunicação visual de impacto para recrutamento de talentos, demonstração de responsabilidade social e humanização da marca no setor de energia.",
      items: [
        "Reels Institucionais e Behind-the-Scenes das Plantas",
        "Campanhas de Recrutamento de Talentos",
        "Cobertura de Projetos de Responsabilidade Social (RSE)",
        "Stories e Lives em Eventos Globais do Setor"
      ],
      metrics: [
        { label: "Engajamento", value: "6.2%" },
        { label: "Alcance/Post", value: "+45K" },
        { label: "Partilhas/Sem.", value: "+800" }
      ]
    },
    {
      name: "TikTok",
      subtitle: "DINAMISMO & EDUCAÇÃO TÉCNICA",
      icon: <Video size={24} />,
      color: "text-white",
      bgIcon: "bg-black shadow-[0_0_15px_rgba(0,255,255,0.3)]",
      desc: "Traduzimos processos complexos do setor energético em narrativas curtas e dinâmicas, alcançando novos stakeholders e democratizando o conhecimento técnico.",
      items: [
        "Drops de Conhecimento (Quick Technical Tips)",
        "Tour 60s pelas Instalações e Tecnologias",
        "Desafios de Segurança e Cultura Organizacional",
        "Edição Dinâmica de Processos Industriais"
      ],
      metrics: [
        { label: "Visualizações", value: "+200K" },
        { label: "Retenção Vídeo", value: "12%" },
        { label: "Novos Seguidores", value: "+10K" }
      ]
    },
    {
      name: "X / Twitter",
      subtitle: "INFORMAÇÃO EM TEMPO REAL & PR",
      icon: <Twitter size={24} />,
      color: "text-white",
      bgIcon: "bg-black",
      desc: "Gestão de reputação e presença imediata nas discussões globais sobre o mercado de energia, commodities e políticas de sustentabilidade.",
      items: [
        "Live-tweeting de Conferências e Fóruns de Energia",
        "Monitoramento de Crises e Notícias do Setor (PR)",
        "Fios (Threads) de Análise de Mercado e Dados",
        "Engajamento Direto com Jornalistas e Analistas"
      ],
      metrics: [
        { label: "Impressões/Mês", value: "+50K" },
        { label: "Menções Estrat.", value: "+300" },
        { label: "Taxa de Cliques", value: "Alta" }
      ]
    }
  ];

  return (
    <section id="social" className="py-24 relative bg-quantic-petrol overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-quantic-teal/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div className="max-w-3xl">
              <h5 className="text-quantic-teal text-[13px] font-black uppercase tracking-[0.3em] mb-4">
                Social Media Authority
              </h5>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                POSICIONAMENTO DE <br /> <span className="text-gradient">ALTA PERFORMANCE.</span>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="text-white/40 text-sm font-medium leading-relaxed">
                Transformamos tecnicismo em autoridade. Estratégias desenhadas para C-levels, thought leaders e decisores globais do setor energético.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p, i) => (
            <Reveal key={i}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/[0.05] p-10 flex flex-col h-full rounded-sm hover:border-quantic-teal/40 transition-all duration-500 group shadow-2xl">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className={`p-5 ${p.bgIcon} ${p.color} rounded-full mb-6 transition-transform duration-500 group-hover:scale-110`}>
                    {p.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-widest mb-2 uppercase">{p.name}</h3>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] leading-tight ${p.color === 'text-white' ? 'text-quantic-teal' : p.color}`}>
                    {p.subtitle}
                  </p>
                </div>

                <p className="text-white/50 text-[13px] leading-relaxed mb-10 font-medium text-center md:text-left">
                  {p.desc}
                </p>

                <div className="space-y-4 mb-16 flex-1">
                  {p.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <div className="mt-1.5 shrink-0">
                         <div className="w-1.5 h-1.5 bg-quantic-teal rotate-45" />
                      </div>
                      <span className="text-[12px] text-white/40 font-medium leading-snug group-hover/item:text-white transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-8">
                  {p.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-base md:text-lg font-black text-white mb-1 leading-none tracking-tighter">
                        {m.value}
                      </p>
                      <p className="text-[7px] text-white/30 uppercase font-black leading-tight tracking-widest">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
