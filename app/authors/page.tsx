"use client";

import BlogHeader from "@/components/blog/BlogHeader";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AuthorsPage() {
  const { data: authors, isLoading } = trpc.articles.getAuthors.useQuery();

  if (isLoading) return <p className="text-center py-20">Cargando autores...</p>;
  if (!authors || authors.length === 0) return <p className="text-center py-20">No hay autores.</p>;

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="mx-auto max-w-7xl px-6 py-12 mt-10">
        <h1 className="text-4xl font-black mb-4">Nuestros Autores</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Conoce a las mentes detrás de nuestras historias más leídas y descubre su trabajo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link 
              href={`/authors/${encodeURIComponent(author.name)}`} 
              key={author.name}
              className="block"
            >
              <Card key={author.name} className="group hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{author.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {author.count} {author.count === 1 ? 'artículo publicado' : 'artículos publicados'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}