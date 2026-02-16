import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

interface ArticleCardProps {
  title: string
  excerpt: string
  coverImage: string
  authorName: string
  date: string
  category: string
  readTime: string
}

export default function ArticleCard({
  title,
  excerpt,
  coverImage,
  authorName,
  date,
  category,
  readTime,
}: ArticleCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-xl border border-border bg-secondary">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/10 transition-opacity duration-300 group-hover:opacity-0" />
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-border text-muted-foreground text-[10px] uppercase tracking-wider px-2.5 py-0.5"
          >
            {category}
          </Badge>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {readTime}
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent lg:text-2xl text-pretty">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {excerpt}
        </p>

        <div className="mt-2 flex items-center gap-3 border-t border-border pt-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
            {authorName.charAt(0)}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{authorName}</span>
            <span>{"/"}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
