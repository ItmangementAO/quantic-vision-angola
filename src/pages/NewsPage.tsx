import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Tag, X, Maximize2, User } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence } from 'motion/react';

interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  category: string;
  isHighlight: boolean;
  authorName?: string;
  publishedAt: any;
}

export const NewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchArticles = async () => {
      const q = query(
        collection(db, 'news'),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      
      setArticles(docs);
      setLoading(false);

      // Abrir modal se houver parâmetro de ID
      const articleId = searchParams.get('at');
      if (articleId) {
        const found = docs.find(a => a.id === articleId);
        if (found) setSelectedArticle(found);
      }
    };

    fetchArticles();
  }, [searchParams]);

  const formatAuthorName = (name?: string) => {
    if (!name) return 'Equipa Quantic';
    const parts = name.trim().split(' ');
    if (parts.length <= 1) return name;
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  const highlights = articles.filter(a => a.isHighlight);
  const regularNews = articles.filter(a => !a.isHighlight);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-quantic-teal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 bg-quantic-petrol">
      <Helmet>
        <title>Notícias | Quantic Vision - Energy & Oil Insights</title>
        <meta name="description" content="Acompanhe as últimas notícias e insights sobre o setor de energia e petróleo em Angola e no mundo com a Quantic Vision." />
        <meta property="og:title" content="Portal de Notícias | Quantic Vision" />
        <meta property="og:description" content="Fique por dentro das novidades do setor energético, sustentabilidade e inovação." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-quantic-teal font-display font-bold text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Energy & Oil Insights
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9]"
          >
            Portal de <span className="text-white/20">Notícias</span>
          </motion.h1>
        </div>

        {/* Highlight Section */}
        {highlights.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px bg-quantic-teal w-12" />
               <h2 className="text-sm font-black uppercase tracking-[0.3em] text-quantic-teal">Destaques da Semana</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {highlights.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-[500px] overflow-hidden rounded-sm border border-white/5 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <img 
                    src={article.imageUrl || null} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-quantic-petrol via-quantic-petrol/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-10 w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-quantic-teal text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5">Destaque</span>
                      <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{article.category}</span>
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-2">
                        <User size={10} className="text-quantic-teal" /> {formatAuthorName(article.authorName)}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-display font-black text-white mb-4 leading-tight group-hover:text-quantic-teal transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">
                      Visualização Rápida <Maximize2 size={12} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
           <div className="h-px bg-white/10 w-12" />
           <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/40">Últimas Actualizações</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {regularNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-white/[0.02] border border-white/5 overflow-hidden hover:border-quantic-teal/30 transition-all duration-500 cursor-pointer flex flex-col h-full rounded-sm"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={article.imageUrl || null} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-quantic-teal text-black p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                     <Maximize2 size={16} />
                   </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[8px] font-black text-quantic-teal uppercase tracking-[0.2em] px-1.5 py-0.5 bg-quantic-teal/10">
                    {article.category}
                  </span>
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar size={10} />
                    {article.publishedAt ? format(article.publishedAt.toDate(), 'dd/MM/yy') : 'Recent'}
                  </span>
                </div>
                <h3 className="text-sm font-display font-black text-white mb-3 line-clamp-2 uppercase leading-tight group-hover:text-quantic-teal transition-colors tracking-wide">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-[9px] text-white/30 font-bold uppercase tracking-widest mb-4">
                   <User size={10} className="text-quantic-teal/50" /> {formatAuthorName(article.authorName)}
                </div>
                <p className="text-white/40 text-[11px] leading-relaxed mb-6 line-clamp-2 font-medium">
                  {article.subtitle}
                </p>
                <div className="mt-auto pt-4 border-t border-white/[0.03] flex items-center justify-between group-hover:border-quantic-teal/20 transition-colors">
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Ver Insights</span>
                  <ArrowRight size={12} className="text-quantic-teal group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/40 font-display text-xl uppercase tracking-widest">Nenhuma notícia encontrada.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedArticle(null)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-full bg-quantic-petrol border border-white/10 overflow-y-auto flex flex-col rounded-sm"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-quantic-teal hover:text-black transition-colors rounded-full"
              >
                <X size={20} />
              </button>

              <div className="aspect-video lg:aspect-[21/9] w-full relative">
                <img 
                  src={selectedArticle.imageUrl || null} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-quantic-petrol to-transparent" />
              </div>

              <div className="p-8 lg:p-16">
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-quantic-teal font-black uppercase tracking-widest text-[10px] px-3 py-1 bg-quantic-teal/10">
                    {selectedArticle.category}
                  </span>
                  <span className="text-white/40 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                    <Calendar size={12} />
                    {selectedArticle.publishedAt ? format(selectedArticle.publishedAt.toDate(), 'dd/MM/yyyy HH:mm') : 'Recent'}
                  </span>
                  <span className="text-white/40 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                    <User size={12} className="text-quantic-teal" />
                    POR: {formatAuthorName(selectedArticle.authorName)}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-5xl font-display font-black text-white mb-6 leading-tight uppercase">
                  {selectedArticle.title}
                </h2>
                
                <p className="text-xl text-white/60 mb-12 font-medium leading-relaxed italic border-l-4 border-quantic-teal pl-6">
                  {selectedArticle.subtitle}
                </p>

                <div className="prose prose-invert prose-quantic max-w-none">
                  <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Quantic Vision Insights</div>
                   <button 
                    onClick={() => setSelectedArticle(null)}
                    className="text-xs font-black uppercase tracking-widest text-quantic-teal hover:text-white transition-colors"
                   >
                     Fechar Detalhes
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
