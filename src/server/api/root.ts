import { bookingsRouter } from "./routers/bookings";
import { ListingsRouter } from "./routers/listings";
import { reviewsRouter } from "./routers/reviews";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for our backend.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listings: ListingsRouter,
  reviews: reviewsRouter,
  bookings: bookingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
