"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, ArticleInput } from "@/schemas/article";
import { trpc } from "@/lib/trpc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Article } from "@/types/article";

interface Props {
  editingArticle?: Article | null;
  onFinished: () => void;
}

export default function CreateArticleForm({ editingArticle, onFinished }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema),
  });
  const utils = trpc.useUtils();

  useEffect(() => {
    if (editingArticle) {
      reset({
        title: editingArticle.title,
        text: editingArticle.text,
        coverImage: editingArticle.coverImage
      });
    }
  }, [editingArticle, reset]);

  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => {
      utils.articles.listMyArticles.invalidate(); 
      onFinished();
      reset();
      alert("¡Artículo actualizado!");
    }
  });
  
  const createArticle = trpc.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.listMyArticles.invalidate(); 
      reset();
      alert("¡Artículo creado!");
    },
  });

  const onSubmit = (data: ArticleInput) => {
    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle._id.toString(), data });
    } else {
      createArticle.mutate(data);
    }
  };

  const isPending = createArticle.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-xs font-bold uppercase text-slate-500 ml-1">Título</Label>
        <Input 
          id="title" 
          {...register("title")} 
          placeholder="Ej: El futuro del CMS..." 
          className="rounded-xl border-slate-200 focus:ring-primary"
        />
        {errors.title && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage" className="text-xs font-bold uppercase text-slate-500 ml-1">Imagen de Portada (URL)</Label>
        <Input 
          id="coverImage" 
          {...register("coverImage")} 
          placeholder="https://images.unsplash.com/..." 
          className="rounded-xl border-slate-200"
        />
        {errors.coverImage && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.coverImage.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="text" className="text-xs font-bold uppercase text-slate-500 ml-1">Contenido</Label>
        <Textarea 
          id="text" 
          {...register("text")} 
          placeholder="Escribe aquí tu historia..." 
          className="min-h-[200px] rounded-xl border-slate-200 resize-none" 
        />
        {errors.text && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.text.message}</p>}
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button type="submit" className="w-full rounded-xl font-bold h-12 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]" disabled={isPending}>
          {isPending 
            ? "Procesando..." 
            : editingArticle ? "Actualizar Artículo" : "Publicar Ahora"}
        </Button>

        {editingArticle && (
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full rounded-xl text-slate-400"
            onClick={() => {
              reset({ title: "", text: "", coverImage: "" });
              onFinished();
            }}
          >
            Descartar cambios
          </Button>
        )}
      </div>
    </form>
  );
}