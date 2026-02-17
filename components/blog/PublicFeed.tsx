"use client"

import { trpc } from "@/lib/trpc"
import ArticleCard from "./ArticleCard"
import ArticleRow from "./ArticleRow"
import FeaturedArticle from "./FeaturedArticle"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Article } from "@/types/article"
import { useSearchParams } from "next/navigation"

interface PublicFeedProps {
  initialData?: {
    articles: Article[];
  }
}

export default function PublicFeed({ initialData }: PublicFeedProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  const { data: searchData, isLoading: isSearching } = trpc.articles.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  )

  const { data: listData, isLoading: isListing } = trpc.articles.listPublic.useQuery(
    { limit: 15 },
    { 
      enabled: searchQuery.length === 0,
      initialData: searchQuery.length === 0 ? initialData : undefined, 
      staleTime: 1000 * 60,
    }
  )

  const isLoading = isSearching || (isListing && !initialData)
  if (isLoading) return <PublicFeedSkeleton />

  if (searchQuery) {
    const results = searchData?.articles || []
    
    return (
      <div className="flex flex-col gap-10">
        <div className="border-b pb-5">
          <h2 className="text-2xl font-bold">
            Resultados para &quot;{searchQuery}&quot;
            <span className="ml-2 text-muted-foreground font-normal text-lg">
              ({results.length})
            </span>
          </h2>
        </div>

        {results.length === 0 ? (
          <p className="text-center py-20 text-slate-500">No encontramos nada que coincida con tu búsqueda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((article: Article) => (
              <Link key={article._id.toString()} href={`/blog/${article._id.toString()}`}>
                <ArticleCard
                  title={article.title}
                  excerpt={article.text}
                  coverImage={article.coverImage}
                  authorName={article.authorName || "Autor"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  category="Resultado"
                  readTime="Lectura"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  const articles = listData?.articles || []
  if (articles.length === 0) return <p className="text-center py-20 text-muted-foreground">No hay historias aún.</p>

  const featured = articles[0]
  const gridArticles = articles.slice(1, 7)
  const archiveArticles = articles.slice(7)

  return (
    <div className="flex flex-col gap-20">
      {featured && (
        <section>
          <Link key={featured._id.toString()} href={`/blog/${featured._id.toString()}`}>
            <FeaturedArticle
              title={featured.title}
              text={featured.text}
              coverImage={featured.coverImage}
              authorName={featured.authorName || "Autor"}
              date={new Date(featured.createdAt).toLocaleDateString()}
              category="Novedad"
              readTime="5 min"
            />
          </Link>
        </section>
      )}

      {gridArticles.length > 0 && (
        <section>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Historias recientes
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article) => (
              <Link key={article._id.toString()} href={`/blog/${article._id.toString()}`}>
                <ArticleCard
                  title={article.title}
                  excerpt={article.text}
                  coverImage={article.coverImage}
                  authorName={article.authorName || "Autor"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  category="Tecnología"
                  readTime="6 min"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {archiveArticles.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Archivo
            </h2>
          </div>
          <div className="border-t border-border">
            {archiveArticles.map((article) => (
              <Link key={article._id.toString()} href={`/blog/${article._id.toString()}`}>
                <ArticleRow
                  key={article._id.toString()}
                  title={article.title}
                  authorName={article.authorName || "Autor"}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  category="Legacy"
                  readTime="4 min"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function PublicFeedSkeleton() {
    return <div className="space-y-10 px-4"><Skeleton className="h-100 w-full" /><Skeleton className="h-50 w-full" /></div>
}