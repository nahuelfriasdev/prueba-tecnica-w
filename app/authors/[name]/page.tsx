"use client";

import { useParams } from "next/navigation";
import { useAuthorArticles } from "@/hooks/use-author-articles";
import ArticleCard from "@/components/blog/ArticleCard";
import BlogHeader from "@/components/blog/BlogHeader";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthorProfilePage() {
  const params = useParams();
  const authorName = decodeURIComponent(params.name as string);
  
  const { articles, count, isLoading } = useAuthorArticles(authorName);

  return (
    <div className="min-h-screen bg-white">
      <BlogHeader />
      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-16 border-b pb-10">
          <h1 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">
            Artículos de
          </h1>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900">
            {authorName}
          </h2>
          {!isLoading && (
            <p className="mt-4 text-slate-500 font-medium">
              Se encontraron {count} publicaciones.
            </p>
          )}
        </header>

        {isLoading ? (
          <AuthorProfileSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => (
              <Link 
                key={article._id.toString()} 
                href={`/blog/${article._id.toString()}`}
                className="transition-transform hover:scale-[1.02]"
              >
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
        )}
        
        {!isLoading && articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Este autor aún no tiene publicaciones.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function AuthorProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}