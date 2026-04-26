import { Reveal } from './Reveal';
import { Newspaper, ArrowUpRight, ChevronRight, Calendar, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const Portal = () => {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const q = query(
          collection(db, 'news'),
          where('status', '==', 'published'),
          where('isHighlight', '==', true),
          orderBy('publishedAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        setHighlights(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erro ao carregar destaques:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  const formatAuthorName = (name?: string) => {
    if (!name) return 'Equipa Quantic';
    const parts = name.trim().split(' ');
    if (parts.length <= 1) return name;
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  return (
    <section id="portal" className="py-24 bg-quantic-petrol">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-quantic-teal mb-6">
                <Newspaper size={20} />
                <span className="text-[13px] font-black uppercase tracking-[0.4em]">PORTAL QUANTIC VISION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                Energia e Óleo <br />
                <span className="text-white/20 uppercase">em Perspectiva</span>
              </h2>
            </div>
            <button 
              onClick={() => navigate('/noticias')}
              className="text-white/40 hover:text-quantic-teal font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2 transition-colors pb-2 border-b border-white/10 hover:border-quantic-teal"
            >
              VER TODAS AS NOTÍCIAS <ArrowUpRight size={16} />
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
             [1,2,3].map(i => (
               <div key={i} className="aspect-video bg-white/5 animate-pulse border border-white/5" />
             ))
          ) : highlights.length > 0 ? (
            highlights.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <article 
                  className="group cursor-pointer"
                  onClick={() => navigate(`/noticias?at=${item.id}`)}
                >
                  <div className="relative aspect-video overflow-hidden mb-6 border border-white/5">
                    <img 
                      src={item.imageUrl || null} 
                      alt={item.title}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-quantic-teal px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase">
                      {item.category}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[10px] text-white/30 font-bold tracking-widest">
                      <Calendar size={12} className="text-quantic-teal/50" />
                      {item.publishedAt ? format(item.publishedAt.toDate(), 'dd MMM yyyy') : 'Recently'}
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-quantic-teal transition-colors leading-tight tracking-tight uppercase line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                       <User size={10} className="text-quantic-teal/30" /> {formatAuthorName(item.authorName)}
                    </div>
                    <div className="flex items-center gap-2 text-white/20 group-hover:text-quantic-blue transition-colors font-black text-[10px] uppercase tracking-widest pt-2">
                      LER ARTIGO COMPLETO <ChevronRight size={12} />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))
          ) : (
            <div className="col-span-3 text-center py-20 border border-dashed border-white/10">
               <span className="text-white/20 font-black uppercase tracking-widest text-xs">Novos insights em breve.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
