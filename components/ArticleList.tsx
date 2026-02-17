"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit3, Trash2, ChevronLeft, ChevronRight, Inbox } from "lucide-react"; 
import Image from "next/image";
import { keepPreviousData } from "@tanstack/react-query";
import { Article } from "@/types/article";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleList({ onEdit }: { onEdit: (article: Article) => void }) {
  const [page, setPage] = useState(1);
  const limit = 5;
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.articles.listMyArticles.useQuery(
    { page, limit },
    { placeholderData: keepPreviousData }
  );

  const deleteArticle = trpc.articles.delete.useMutation({
    onMutate: async (deletedVars) => {
      await utils.articles.listMyArticles.cancel();
      const previousData = utils.articles.listMyArticles.getData({ page, limit });
      utils.articles.listMyArticles.setData({ page, limit }, (old) => {
        if (!old) return old;
        return {
          ...old,
          articles: old.articles.filter((a) => a._id.toString() !== deletedVars.id),
        };
      });
      return { previousData };
    },
    onError: (err, newVar, context) => {
      utils.articles.listMyArticles.setData({ page, limit }, context?.previousData);
      alert("Error al eliminar. Inténtalo de nuevo.");
    },
    onSettled: () => {
      utils.articles.listMyArticles.invalidate();
    },
  });

  if (isLoading) return <ArticleListSkeleton />;

  if (!data?.articles.length) return <EmptyState />;

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {data.articles.map((article: Article) => (
          <Card key={article._id.toString()} className="group overflow-hidden border-slate-100 rounded-[2rem] bg-white shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-50">
                <Image 
                  src={article.coverImage} 
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
              
              <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <CardTitle className="text-xl font-black text-slate-800 leading-tight">
                    {article.title}
                  </CardTitle>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-xl w-9 h-9 bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      onClick={() => onEdit(article)} 
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-xl w-9 h-9 bg-slate-50 hover:bg-red-50 hover:text-red-600 transition-colors"
                      disabled={deleteArticle.isPending}
                      onClick={() => {
                        if(confirm("¿Estás seguro de eliminar esta publicación?")) {
                          deleteArticle.mutate({ id: article._id.toString() });
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium">
                  {article.text}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-slate-400">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
          Página {page} de {data.totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="rounded-xl font-bold"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= data.totalPages}
            className="rounded-xl font-bold px-4"
          >
            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-48 w-full rounded-[2rem]" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-20 text-center">
      <div className="bg-slate-50 p-6 rounded-3xl mb-6">
        <Inbox className="w-10 h-10 text-slate-200" />
      </div>
      <h3 className="text-xl font-black text-slate-800">No hay nada por aquí</h3>
      <p className="text-slate-400 text-sm max-w-60 mt-2 font-medium">
        Tus artículos aparecerán listados aquí una vez que los publiques.
      </p>
    </div>
  );
}