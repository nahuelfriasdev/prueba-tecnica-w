import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/routers/articles";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Article = RouterOutput["articles"]["listMyArticles"]["articles"][number];

export type ArticleInput = RouterOutput["articles"]["listMyArticles"]["articles"][number];