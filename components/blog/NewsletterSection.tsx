import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function NewsletterSection() {

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              NEWSLETTER
            </span>
          </div>

          <h2 className="mb-4 font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            No te pierdas ninguna historia
          </h2>
          <p className="mb-10 max-w-md text-base text-muted-foreground leading-relaxed">
            Recibe las mejores historias sobre tecnologia y rendimiento web
            directamente en tu bandeja de entrada cada semana.
          </p>

          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              disabled
              placeholder="tu@email.com"
              className="h-12 flex-1 rounded-full border-border bg-secondary px-5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
            />
            <Button className="h-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-6 gap-2 cursor-pointer">
              Suscribirse
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </section>
  )
}
