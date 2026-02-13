import { router, publicProcedure } from '../trpc';
import { articleSchema } from '@/schemas/article';
import clientPromise from '@/lib/mongodb';

export const articleRouter = router({
  create: publicProcedure
    .input(articleSchema) 
    .mutation(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db();
      
      const result = await db.collection('articles').insertOne({
        ...input,
        createdAt: new Date(),
      });
      
      return { id: result.insertedId };
    }),
    
  list: publicProcedure.query(async () => {
    const client = await clientPromise;
    const db = client.db();
    return await db.collection('articles').find().toArray();
  }),
});

export type AppRouter = typeof articleRouter;