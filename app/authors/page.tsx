"use client";

import BlogHeader from "@/components/blog/BlogHeader";
import { useAuthors } from "@/hooks/use-authors";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

export default function AuthorsPage() {
  const { authors, isLoading, hasAuthors } = useAuthors();

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="mx-auto max-w-7xl px-6 py-12 mt-10">
        <header className="max-w-2xl mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-4 sm:text-5xl">
            Nuestros Autores
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Conoce a las mentes detrás de nuestras historias más leídas y descubre su trabajo.
          </p>
        </header>

        {isLoading ? (
          <AuthorsSkeleton />
        ) : !hasAuthors ? (
          <EmptyAuthors />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link 
                href={`/authors/${encodeURIComponent(author.name)}`} 
                key={author.name}
                className="group block"
              >
                <Card className="h-full border-slate-200 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5 group-hover:border-primary/30 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 flex items-center gap-6">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {author.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{author.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium mt-1">
                        {author.count} {author.count === 1 ? 'artículo publicado' : 'artículos publicados'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function AuthorsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-3xl" />
      ))}
    </div>
  );
}

function EmptyAuthors() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl border-slate-200">
      <Users className="h-12 w-12 text-slate-300 mb-4" />
      <h3 className="text-xl font-bold">No hay autores todavía</h3>
      <p className="text-muted-foreground">Vuelve más tarde para conocer a nuestro equipo.</p>
    </div>
  );
}