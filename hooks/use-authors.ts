import { trpc } from "@/lib/trpc";

export function useAuthors() {
  const { data: authors, isLoading, error } = trpc.articles.getAuthors.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  return {
    authors: authors ?? [],
    isLoading,
    error,
    hasAuthors: authors && authors.length > 0,
  };
}