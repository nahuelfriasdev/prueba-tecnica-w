"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, ArticleInput } from "@/schemas/article";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";

// Imports de Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CreateArticleForm() {
  const router = useRouter();
  
  const createArticle = trpc.articles.create.useMutation({
    onSuccess: () => {
      alert("¡Artículo creado!");
      router.refresh();
      reset();
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema),
  });

  const onSubmit = (data: ArticleInput) => {
    createArticle.mutate(data);
  };

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
        <Textarea id="text" {...register("text")} placeholder="¿De qué trata tu artículo?" className="min-h-[150px]" />
        {errors.text && <p className="text-destructive text-sm">{errors.text.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={createArticle.isPending}>
        {createArticle.isPending ? "Publicando..." : "Publicar ahora"}
      </Button>
    </form>
  );
}