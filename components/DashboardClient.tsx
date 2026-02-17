"use client";

import { useState } from "react";
import CreateArticleForm from "./CreateArticleForm";
import ArticleList from "./ArticleList";
import { Article } from "@/types/article";
import { DashboardUser } from "@/types/auth";
import { PlusCircle, LayoutDashboard } from "lucide-react";

export function DashboardClient({ user }: { user: DashboardUser }) {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest">
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel de Control</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Hola, {user.name.split(' ')[0]}
            </h1>
            <p className="text-slate-500 font-medium">
              Gestiona tus artículos y publicaciones desde aquí.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 md:sticky md:top-24 order-1 ">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <PlusCircle className="w-5 h-5 text-primary" />
                <h2>{editingArticle ? "Editar Artículo" : "Nueva Publicación"}</h2>
              </div>
              <CreateArticleForm 
                editingArticle={editingArticle} 
                onFinished={() => setEditingArticle(null)} 
              />
            </div>
          </aside>

          <section className="lg:col-span-8 order-2 ">
            <ArticleList onEdit={(art) => {
              setEditingArticle(art);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          </section>
        </div>
      </div>
    </div>
  );
}