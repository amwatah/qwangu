import { createTRPCRouter, publicProcedure } from "./trpc";

/**
 * This is the primary router for our backend.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello Qwangu";
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
