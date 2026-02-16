import { appRouter } from "@/server/routers/articles";
import Image from "next/image";
import { notFound } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function ArticlePage({ params }: { params: tParams }) {
  const { id } = await params;

  const caller = appRouter.createCaller({}); 

  let article;
  try {
    article = await caller.articles.getById({ id });
  } catch (error) {
    console.error("Error cargando artículo:", error);
    return notFound();
  }

  if (!article) return notFound();

  return (
    <article className="min-h-screen bg-white">
      <header className="max-w-4xl mx-auto pt-20 px-6">
        <div className="flex items-center gap-3 mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>{article.authorName || "Wortise Author"}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[0.9] text-balance">
          {article.title}
        </h1>
      </header>

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="relative aspect-21/9 overflow-hidden rounded-xl bg-slate-100">
          <Image 
            src={article.coverImage} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        <p className="text-xl leading-relaxed text-slate-700 whitespace-pre-wrap">
          {article.text}
        </p>
      </div>
    </article>
  );
}