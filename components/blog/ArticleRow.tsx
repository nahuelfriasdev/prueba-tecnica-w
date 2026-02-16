import { ArrowRight } from "lucide-react"

interface ArticleRowProps {
  title: string
  authorName: string
  date: string
  category: string
  readTime: string
}

export default function ArticleRow({
  title,
  authorName,
  date,
  category,
  readTime,
}: ArticleRowProps) {
  return (
    <article className="group cursor-pointer border-b border-border py-6 transition-colors hover:border-accent/40">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex items-center gap-4 md:w-36">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {date}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-lg font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent md:text-xl">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <span className="hidden text-xs text-muted-foreground md:inline">{category}</span>
          <span className="text-xs text-muted-foreground">{authorName}</span>
          <span className="hidden text-xs text-muted-foreground md:inline">{readTime}</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </div>
    </article>
  )
}
