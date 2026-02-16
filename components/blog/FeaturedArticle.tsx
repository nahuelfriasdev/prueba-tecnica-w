import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

interface FeaturedArticleProps {
  title: string
  text: string
  coverImage: string
  authorName: string
  date: string
  category: string
  readTime: string
}

export default function FeaturedArticle({
  title,
  text,
  coverImage,
  authorName,
  date,
  category,
  readTime,
}: FeaturedArticleProps) {
  return (
    <article className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-accent/30">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-120">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute left-4 top-4">
            <Badge className="rounded-full border-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold">
              Destacado
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 lg:p-12">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Badge variant="outline" className="rounded-full border-border text-muted-foreground text-xs px-3 py-1">
                {category}
              </Badge>
              <span className="text-xs text-muted-foreground">{readTime}</span>
            </div>

            <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl text-balance">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground line-clamp-3">
              {text}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{authorName}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
