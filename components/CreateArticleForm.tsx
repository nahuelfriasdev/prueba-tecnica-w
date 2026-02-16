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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título del artículo</Label>
        <Input id="title" {...register("title")} placeholder="Un título llamativo..." />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">URL de la imagen</Label>
        <Input id="coverImage" {...register("coverImage")} placeholder="https://..." />
        {errors.coverImage && <p className="text-destructive text-sm">{errors.coverImage.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="text">Contenido</Label>
        <Textarea id="text" {...register("text")} placeholder="¿De qué trata tu artículo?" className="min-h-37.5" />
        {errors.text && <p className="text-destructive text-sm">{errors.text.message}</p>}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending 
            ? "Guardando..." 
            : editingArticle ? "Guardar cambios" : "Publicar ahora"}
        </Button>

        {editingArticle && (
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => {
              reset({ title: "", text: "", coverImage: "" });
              onFinished();
            }}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}