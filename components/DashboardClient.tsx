"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import CreateArticleForm from "./CreateArticleForm";
import ArticleList from "./ArticleList";
import { DashboardUser } from "@/types/auth";
import { PlusCircle, LayoutDashboard, PenTool, Files } from "lucide-react";

export function DashboardClient({ user }: { user: DashboardUser }) {
  const { editingArticle, startEditing, cancelEditing, isEditing } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="relative p-8 rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl shadow-slate-200">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-[10px] font-black uppercase tracking-widest">
            <LayoutDashboard className="w-3 h-3" />
            Workspace
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Bienvenido, {user.name.split(' ')[0]}
          </h1>
          <p className="text-white/50 font-medium max-w-md">
            Tienes el control total de tus publicaciones. Crea, edita y gestiona tus artículos de Wortise Journal.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isEditing ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                  {isEditing ? <PenTool className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                </div>
                <h2 className="font-black text-xl tracking-tight">
                  {isEditing ? "Editar" : "Crear"}
                </h2>
              </div>
              {isEditing && (
                <button 
                  onClick={cancelEditing}
                  className="text-xs font-bold text-slate-400 hover:text-destructive transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
            
            <CreateArticleForm 
              editingArticle={editingArticle} 
              onFinished={cancelEditing} 
            />
          </div>
        </aside>

        <section className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-center gap-2 mb-6 ml-2">
            <Files className="w-4 h-4 text-slate-400" />
            <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs">Tus publicaciones recientes</h2>
          </div>
          <ArticleList onEdit={startEditing} />
        </section>
      </div>
    </div>
  );
}