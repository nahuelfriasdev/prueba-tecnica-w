import { useState } from "react";
import { Article } from "@/types/article";

export function useDashboard() {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const startEditing = (article: Article) => {
    setEditingArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => setEditingArticle(null);

  return {
    editingArticle,
    startEditing,
    cancelEditing,
    isEditing: !!editingArticle
  };
}