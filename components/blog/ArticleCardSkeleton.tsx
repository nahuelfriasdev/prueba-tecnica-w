import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-16/10 w-full rounded-xl" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <Skeleton className="h-7 w-7 rounded-full" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  )
}
