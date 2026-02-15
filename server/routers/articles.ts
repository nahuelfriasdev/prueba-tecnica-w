import { router, publicProcedure } from '../trpc';
import { articleSchema } from '@/schemas/article';
import clientPromise from '@/lib/mongodb';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TRPCError } from "@trpc/server";

export const articleRouter = router({
  create: publicProcedure
    .input(articleSchema) 
    .mutation(async ({ input }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Debes estar logueado" });
      }

      const client = await clientPromise;
      const db = client.db("wortise");

      const newArticle = {
        ...input,
        authorId: session.user.id, 
        authorName: session.user.name, 
        createdAt: new Date(),
      };

      const result = await db.collection('articles').insertOne(newArticle);
      
      return { success: true, id: result.insertedId };
    }),
});

export const appRouter = router({
  articles: articleRouter,
});

export type AppRouter = typeof appRouter;