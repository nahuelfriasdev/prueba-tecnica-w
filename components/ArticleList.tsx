"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit3, Trash2 } from "lucide-react"; 
import Image from "next/image";
import { keepPreviousData } from "@tanstack/react-query";
import { Article } from "@/types/article";

export default function ArticleList({ onEdit }: { onEdit: (article: Article) => void }) {
  const [page, setPage] = useState(1);
  const limit = 5;

 const { data, isLoading } = trpc.articles.listMyArticles.useQuery(
    { page, limit },
    { 
      placeholderData: keepPreviousData
    }
  );

  const utils = trpc.useUtils(); 
  const deleteArticle = trpc.articles.delete.useMutation({
    onSuccess: () => {
      utils.articles.listMyArticles.invalidate(); 
    }
  });

  if (isLoading) {
    return <div className="space-y-4">Cargando tus artículos...</div>;
  }

  if (!data?.articles.length) {
    return (
      <Card className="bg-slate-100/50 border-dashed border-2 border-slate-200 flex flex-col items-center justify-center p-20 transition-all hover:bg-slate-100/80">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-slate-600 font-semibold">No hay artículos todavía</p>
          <p className="text-sm text-slate-400 max-w-62.5 mx-auto">
            Usa el formulario de la izquierda para publicar tu primer contenido. [cite: 59, 60]
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {data.articles.map((article: Article) => (
          <Card key={article._id.toString()} className="group overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-none hover:shadow-xl transition-all duration-300 p-4">
            <div className="flex flex-col md:flex-row">
              
              <div className="relative w-full md:w-56 h-62.5 md:h-auto shrink-0 overflow-hidden bg-slate-100">
                <Image 
                  src={article.coverImage} 
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              </div>
              
              <div className="flex flex-col flex-1 p-5 min-w-0 bg-white">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <CardTitle className="text-lg md:text-xl font-black text-slate-800 leading-tight line-clamp-2">
                    {article.title}
                  </CardTitle>
                  
                  <div className="flex gap-1 shrink-0">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-full w-8 h-8"
                      onClick={() => onEdit(article)} 
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="rounded-full w-8 h-8"
                      disabled={deleteArticle.isPending}
                      onClick={() => {
                        if(confirm("¿Eliminar definitivamente?")) {
                          deleteArticle.mutate({ id: article._id.toString() });
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-3 mb-6">
                  {article.text}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                    Publicado
                  </span>
                </div>
              </div>
            </div>
          </Card>
          ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Pág. {page} / {data.totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="rounded-full px-4 font-bold"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => old + 1)}
            disabled={page >= data.totalPages}
            className="rounded-full px-4 border-slate-200 font-bold shadow-sm"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}