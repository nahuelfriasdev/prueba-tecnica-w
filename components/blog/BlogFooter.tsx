import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function BlogFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <span className="text-sm font-bold text-accent-foreground">W</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                Wortise <span className="text-muted-foreground">Journal</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Una plataforma editorial dedicada a explorar el futuro de la
              tecnologia, el rendimiento web y la innovacion digital.
            </p>
          </div>
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"2026 Wortise CMS."}
          </p>
        </div>
      </div>
    </footer>
  )
}
