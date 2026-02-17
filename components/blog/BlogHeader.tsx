"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { Feather, Menu, X } from "lucide-react"
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
        <div className="absolute top-full left-0 right-0 border-b border-slate-100 bg-white p-6 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Buscar contenido</p>
              <Suspense fallback={<div className="w-full h-12 bg-slate-100 animate-pulse rounded-2xl" />}>
                <Search />
              </Suspense>
            </div>

            <nav className="flex flex-col gap-4">
              <Link 
                href="/authors" 
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 text-sm font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Nuestros autores
              </Link>
              
              <Link 
                href="/login" 
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 text-sm font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Acceso Autor
              </Link>
              
              <Button asChild size="lg" className="mt-4 rounded-2xl bg-slate-900 text-white py-8 font-black uppercase tracking-widest text-xs">
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Feather className="w-4 h-4 mr-2" />
                  Empezar a escribir
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
