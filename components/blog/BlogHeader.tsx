"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Search from "./Search"

export default function BlogHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <span className="text-sm font-bold text-accent-foreground">W</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Wortise <span className="text-muted-foreground">Journal</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/authors" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline">
              Nuestros autores
          </Link>
          <Suspense fallback={<div className="w-64 h-10 bg-slate-100 animate-pulse rounded-md" />}>
            <Search />
          </Suspense>
          <div className="h-5 w-px bg-border" />
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Acceso Autor
          </Link>
          <Button asChild size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-6">
            <Link href="/register">Empezar a escribir</Link>
          </Button>
        </nav>

        <button
          className="flex md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/authors" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Nuestros autores
            </Link>
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Acceso Autor
            </Link>
            <Button asChild className="mt-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/register">Empezar a escribir</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
