import { router, publicProcedure } from '../trpc';
import { articleSchema } from '@/schemas/article';
import clientPromise from '@/lib/mongodb';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TRPCError } from "@trpc/server";
import z from 'zod';
import { ObjectId } from 'mongodb';

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

  listPublic: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10)
    }))
    .query(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db("wortise");
      const skip = (input.page - 1) * input.limit;

      const articles = await db.collection('articles')
        .find({}) 
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(input.limit)
        .toArray();

      return { articles };
    }),
  
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: articleSchema 
    }))
    .mutation(async ({ input }) => {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const client = await clientPromise;
      const db = client.db("wortise");

      await db.collection('articles').updateOne(
        { _id: new ObjectId(input.id), authorId: session.user.id },
        { $set: { ...input.data, updatedAt: new Date() } }
      );

      return { success: true };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const client = await clientPromise;
      const db = client.db("wortise");

      const result = await db.collection('articles').deleteOne({
        _id: new ObjectId(input.id),
        authorId: session.user.id
      });
      
      if (result.deletedCount === 0) {
        throw new TRPCError({ 
          code: "NOT_FOUND", 
          message: "No se encontró el artículo o no tienes permiso" 
        });
      }

      return { success: true };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db("wortise");

      const article = await db.collection('articles').findOne({ 
        _id: new ObjectId(input.id) 
      });

      if (!article) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Artículo no encontrado" });
      }

      return article;
    }),

  getAuthors: publicProcedure
  .query(async () => {
    const client = await clientPromise;
    const db = client.db("wortise");

    const authorsData = await db.collection('articles').aggregate([
      {
        $group: {
          _id: "$authorName", 
          count: { $sum: 1 }, 
        }
      },
      {
        $project: {
          _id: 0,              
          name: "$_id",        
          count: 1             
        }
      },
      { $sort: { count: -1 } } 
    ]).toArray();

    return authorsData as { name: string; count: number }[];
  }),

  listByAuthor: publicProcedure
    .input(z.object({ 
      authorName: z.string(),
      limit: z.number().default(10) 
    }))
    .query(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db("wortise");

      const articles = await db.collection('articles')
        .find({ authorName: input.authorName })
        .sort({ createdAt: -1 })
        .limit(input.limit)
        .toArray();

      return { articles };
    }),

  search: publicProcedure
  .input(z.object({ 
    query: z.string().optional() 
  }))
  .query(async ({ input }) => {
    const client = await clientPromise;
    const db = client.db("wortise");

    if (!input.query) return { articles: [] };

    const searchRegex = new RegExp(input.query, 'i');

    const articles = await db.collection('articles')
      .find({
        $or: [
          { title: searchRegex },
          { text: searchRegex },
          { authorName: searchRegex }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    return { articles };
  }),
});

export const appRouter = router({
  articles: articleRouter,
});

export type AppRouter = typeof appRouter;