import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';

interface NewsArticle {
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  category: string;
  publishedAt: any;
}

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      const docRef = doc(db, 'news', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setArticle(docSnap.data() as NewsArticle);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-quantic-teal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-display font-bold mb-8">Notícia não encontrada</h2>
        <Link to="/noticias" className="bg-quantic-teal text-black px-8 py-3 font-bold uppercase tracking-widest">
          Voltar ao Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 bg-quantic-petrol">
      <Helmet>
        <title>{`${article.title} | Notícias | Quantic Vision`}</title>
        <meta name="description" content={article.subtitle} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.subtitle} />
        <meta name="twitter:image" content={article.imageUrl} />
      </Helmet>
      <article className="max-w-4xl mx-auto">
        <Link to="/noticias" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-quantic-teal mb-12 transition-colors">
          <ArrowLeft size={14} /> Voltar ao Portal
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-xs font-bold text-quantic-teal uppercase tracking-widest">
              <Tag size={14} fill="currentColor" /> {article.category}
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest border-l border-white/10 pl-4">
              <Calendar size={14} /> {article.publishedAt ? format(article.publishedAt.toDate(), 'dd/MM/yyyy') : 'Recent'}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-tight mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl text-white/60 font-light leading-relaxed mb-8 border-l-4 border-quantic-teal pl-6">
            {article.subtitle}
          </p>

          <div className="aspect-video w-full overflow-hidden mb-12">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </header>

        <div className="markdown-body prose prose-invert prose-quantic-teal max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-quantic-teal hover:text-black transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};
