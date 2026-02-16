import { ArrowRight } from "lucide-react"

export default function BlogHero() {
  return (
    <section className="relative px-6 pb-20 pt-32 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                NUEVA EDICION DISPONIBLE
              </span>
            </div>
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
              Historias que
              <br />
              <span className="text-accent">inspiran</span> la web
            </h1>
          </div>
          <div className="max-w-sm pb-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              Exploramos el futuro de la tecnologia, el rendimiento web y las ideas
              que impulsan la proxima generacion de experiencias digitales.
            </p>
            <button className="mt-6 group flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent">
              Explorar historias
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
