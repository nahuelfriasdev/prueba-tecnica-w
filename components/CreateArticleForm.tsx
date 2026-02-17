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
import { Loader2, Send, Save, X } from "lucide-react";

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
    } else {
      reset({ title: "", text: "", coverImage: "" });
    }
  }, [editingArticle, reset]);

  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => {
      utils.articles.listMyArticles.invalidate(); 
      onFinished();
      reset();
    }
  });
  
  const createArticle = trpc.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.listMyArticles.invalidate(); 
      reset();
      onFinished();
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
        <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          Título del artículo
        </Label>
        <Input 
          id="title" 
          {...register("title")} 
          placeholder="Ej: El futuro de la publicidad digital" 
          className="rounded-2xl border-slate-200 h-12 focus-visible:ring-primary shadow-sm"
        />
        {errors.title && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          URL de la Imagen
        </Label>
        <Input 
          id="coverImage" 
          {...register("coverImage")} 
          placeholder="https://images.unsplash.com/photo-..." 
          className="rounded-2xl border-slate-200 h-12 shadow-sm"
        />
        {errors.coverImage && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.coverImage.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="text" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          Contenido principal
        </Label>
        <Textarea 
          id="text" 
          {...register("text")} 
          placeholder="Escribe tu historia aquí..." 
          className="min-h-50 rounded-2xl border-slate-200 resize-none shadow-sm p-4" 
        />
        {errors.text && <p className="text-destructive text-[10px] font-bold uppercase px-1">{errors.text.message}</p>}
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <Button 
          type="submit" 
          className="w-full rounded-2xl font-black h-14 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" 
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : editingArticle ? (
            <><Save className="w-4 h-4 mr-2" /> Guardar Cambios</>
          ) : (
            <><Send className="w-4 h-4 mr-2" /> Publicar ahora</>
          )}
        </Button>

        {editingArticle && (
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full rounded-2xl text-slate-400 font-bold hover:bg-slate-100"
            onClick={() => {
              reset();
              onFinished();
            }}
          >
            <X className="w-4 h-4 mr-2" /> Cancelar edición
          </Button>
        )}
      </div>
    </form>
  );
}