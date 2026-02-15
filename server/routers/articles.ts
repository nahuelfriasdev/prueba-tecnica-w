import { router, publicProcedure } from '../trpc';
import { articleSchema } from '@/schemas/article';
import clientPromise from '@/lib/mongodb';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TRPCError } from "@trpc/server";
import z from 'zod';

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

    listMyArticles: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(5),
    }))
    .query(async ({ input }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const client = await clientPromise;
      const db = client.db("wortise");

      const skip = (input.page - 1) * input.limit;

      const articles = await db.collection('articles')
        .find({ authorId: session.user.id })
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(input.limit)
        .toArray();

      const total = await db.collection('articles').countDocuments({ authorId: session.user.id });

      return {
        articles,
        total,
        totalPages: Math.ceil(total / input.limit),
      };
    }),
});

export const appRouter = router({
  articles: articleRouter,
});

export type AppRouter = typeof appRouter;