import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { translationRouter } from "./routers/translation";
import { dictionaryRouter } from "./routers/dictonary";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  translate: translationRouter,
  dictionary: dictionaryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
