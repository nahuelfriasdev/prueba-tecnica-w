"use client";

import { useState } from "react";
import CreateArticleForm from "./CreateArticleForm";
import ArticleList from "./ArticleList";
import { Separator } from "./ui/separator";
import { Article } from "@/types/article";
import { DashboardUser } from "@/types/auth";

export function DashboardClient({ user }: { user: DashboardUser }) {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">

        <header className="flex flex-col gap-3">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Escritorio
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Bienvenido de nuevo, <span className="text-slate-900">{user.name}</span>.
            </p>
          </div>
          <Separator className="bg-slate-200" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <CreateArticleForm 
              editingArticle={editingArticle} 
              onFinished={() => setEditingArticle(null)} 
            />
          </div>
          <div className="lg:col-span-8">
            <ArticleList onEdit={(art) => setEditingArticle(art)} />
          </div>
        </div>
      </div>
    </div>
  );
}