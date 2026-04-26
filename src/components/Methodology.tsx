// Importação do componente de animação de scroll
import { Reveal } from './Reveal';

/**
 * Componente Metodologia - Descreve o processo de trabalho da Quantic Vision.
 * Utiliza o conceito de "Ciclo Científico" para demonstrar rigor técnico.
 */
export const Methodology = () => {
  // Passos fundamentais da metodologia de trabalho
  const steps = [
    {
      id: '01',
      title: 'Diagnóstico Sectorial',
      description: 'Análise profunda do panorama energético e posicionamento actual da sua marca.'
    },
    {
      id: '02',
      title: 'Estratégia Integrada',
      description: 'Arquitectura de comunicação B2B focada e alinhada aos objectivos de negócio.'
    },
    {
      id: '03',
      title: 'Execução Impecável',
      description: 'Implementação táctica multicanal com precisão industrial em todos os pontos de contacto.'
    },
    {
      id: '04',
      title: 'Mensuração & Optimização',
      description: 'Análise de dados contínua para maximização do ROI e reajuste estratégico.'
    }
  ];

  return (
    <section id="metodologia" className="py-24 bg-quantic-petrol">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabeçalho da Secção */}
        <Reveal>
          <div className="mb-20">
            <h5 className="text-quantic-teal text-[13px] font-black uppercase tracking-[0.2em] mb-4">
              Nossa Metodologia (360°)
            </h5>
            <h2 className="text-5xl md:text-6xl font-black text-white max-w-4xl leading-[1.1] normal-case tracking-tighter">
              Ciclo de Alta Performance: O Seu Parceiro Estratégico Único.
            </h2>
          </div>
        </Reveal>

        {/* Grelha de Passos da Metodologia */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Reveal key={step.id}>
              <div className="bg-white/5 backdrop-blur-sm p-10 h-full border border-white/[0.05] hover:border-quantic-teal/30 transition-all duration-500 group relative overflow-hidden shadow-quantic-premium">
                
                {/* Número do Passo em background (Marca de Água) */}
                <div className="text-[80px] font-black text-white/[0.05] absolute -top-4 -left-2 leading-none select-none group-hover:text-white/[0.1] transition-colors">
                  {step.id}
                </div>
                
                {/* Conteúdo do Card */}
                <div className="relative z-10 pt-12">
                  <h3 className="text-2xl font-black text-white mb-6 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Indicador Visual Inferior no Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-quantic-teal group-hover:w-full transition-all duration-700"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
