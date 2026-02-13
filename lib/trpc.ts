import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/articles';

export const trpc = createTRPCReact<AppRouter>();