import { appRouter } from "@/server/routers/articles";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock } from "lucide-react";

type tParams = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { id } = await params;
  const caller = appRouter.createCaller({}); 
  
  try {
    const article = await caller.articles.getById({ id });
    if (!article) return { title: "Artículo no encontrado" };
    
    return {
      title: article.title,
      description: article.text.substring(0, 160), 
      openGraph: {
        images: [article.coverImage],
      },
    };
  } catch {
    return { title: "Wortise Journal" };
  }
}

export default async function ArticlePage({ params }: { params: tParams }) {
  const { id } = await params;
  const caller = appRouter.createCaller({}); 
  const article = await caller.articles.getById({ id }).catch(() => null);

  if (!article) return notFound();

  return (
    <article className="min-h-screen bg-[#fafafa] pb-24">
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-all">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver
          </Link>
          <div className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            Wortise Journal — Editorial
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
             <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">
               Featured Story
             </span>
             <div className="h-px flex-1 bg-slate-200" />
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-12 text-slate-900 balance">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 py-8 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                {article.authorName?.[0] || "W"}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Escrito por</p>
                <p className="text-sm font-black text-slate-900">{article.authorName || "Wortise Staff"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Publicado</p>
                <p className="text-sm font-black text-slate-900">
                   {new Date(article.createdAt).toLocaleDateString('es-AR', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-tight text-slate-400">Lectura</p>
                <p className="text-sm font-black text-slate-900">5 min read</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="relative aspect-16/7 overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-300">
          <Image 
            src={article.coverImage} 
            alt={article.title} 
            fill 
            className="object-cover scale-105"
            priority
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <div className="relative">
          <div className="absolute -left-20 top-0 hidden xl:block text-[10rem] font-black text-slate-50 select-none leading-none">
             “
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-xl md:text-2xl leading-relaxed text-slate-800 font-medium first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:mt-2 whitespace-pre-wrap">
              {article.text}
            </p>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-200 flex justify-between items-center">
          <div className="flex gap-2">
            {["Next.js", "Design", "Tech"].map(tag => (
              <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-slate-100 rounded-md text-slate-500 uppercase">
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}