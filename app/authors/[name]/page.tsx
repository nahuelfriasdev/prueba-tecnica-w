"use client";

import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc";
import ArticleCard from "@/components/blog/ArticleCard"; // Reutilizamos tu componente de v0
import BlogHeader from "@/components/blog/BlogHeader";
import Link from "next/link";

export default function AuthorProfilePage() {
  const params = useParams();
  const authorName = decodeURIComponent(params.name as string);

  const { data, isLoading } = trpc.articles.listByAuthor.useQuery({ 
    authorName 
  });

  if (isLoading) return <div className="p-20 text-center">Cargando publicaciones...</div>;

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-16 border-b pb-10">
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Artículos de</h1>
          <h2 className="text-5xl font-black tracking-tighter">{authorName}</h2>
          <p className="mt-4 text-slate-500">
            Se encontraron {data?.articles.length} publicaciones.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.articles.map((article) => (
            <Link key={article._id.toString()} href={`/blog/${article._id.toString()}`}>
              <ArticleCard
                title={article.title}
                excerpt={article.text}
                coverImage={article.coverImage}
                authorName={article.authorName}
                date={new Date(article.createdAt).toLocaleDateString()}
                category="Publicación"
                readTime="5 min"
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}