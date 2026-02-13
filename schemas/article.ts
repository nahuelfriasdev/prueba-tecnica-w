import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres").max(100),
  text: z.string().min(10, "El contenido es muy corto"),
  coverImage: z.string().url("Debe ser una URL válida de imagen"),
  author: z.string().optional(),
  authorName: z.string().optional(),
  createdAt: z.date().optional(),
});

export type Article = z.infer<typeof articleSchema>;