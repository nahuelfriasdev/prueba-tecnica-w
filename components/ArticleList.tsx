"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"; 
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
      <div className="grid gap-4">
        {data.articles.map((article: Article) => (
          <Card key={article._id.toString()} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-white">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-32 md:h-auto relative bg-slate-100">
                <Image 
                  src={article.coverImage} 
                  alt={article.title}
                  className="object-cover w-full h-full"
                  width={300}
                  height={300}
                />
              </div>
              
              <div className="flex-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold line-clamp-1">{article.title}</CardTitle>
                    <div className="flex gap-2"> 
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onEdit(article)} 
                      >
                        Editar
                      </Button>

                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="cursor-pointer"
                        disabled={deleteArticle.isPending}
                        onClick={() => {
                          if(confirm("¿Seguro quieres borrarlo?")) {
                            deleteArticle.mutate({ id: article._id.toString() });
                          }
                        }}
                      >
                        {deleteArticle.isPending ? "Borrando..." : "Eliminar"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-2">
                    {article.text}
                  </p>
                  <div className="flex items-center text-slate-400 text-xs gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between py-4 border-t border-slate-200">
        <p className="text-sm text-slate-500 font-medium">
          Página {page} de {data.totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => old + 1)}
            disabled={page >= data.totalPages}
            className="cursor-pointer"
          >
            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}