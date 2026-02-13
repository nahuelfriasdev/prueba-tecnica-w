import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { articleRouter } from '@/server/routers/articles';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: articleRouter,
    createContext: () => ({}), 
  });

export { handler as GET, handler as POST };