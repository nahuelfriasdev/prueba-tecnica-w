import { trpc } from "@/lib/trpc";

export function useAuthorArticles(authorName: string) {
  const { data, isLoading, error } = trpc.articles.listByAuthor.useQuery(
    { authorName },
    {
      staleTime: 1000 * 60 * 5, 
    }
  );

  return {
    articles: data?.articles ?? [],
    count: data?.articles.length ?? 0,
    isLoading,
    error,
  };
}