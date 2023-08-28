import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const reviewsRouter = createTRPCRouter({
  getListingReviews: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const reveiws = await ctx.prisma.listing.findUnique({
          where: {
            id: input.listingId,
          },
          select: {
            reviews: true,
          },
        });
        return reveiws;
      } catch (error) {
        console.log(error);
      }
    }),

  addReveiw: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
        memberId: z.string(),
        reveiwMessage: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const addReveiw = await ctx.prisma.reveiws.create({
          data: {
            message: input.reveiwMessage,
            memberId: input.memberId,
            listingId: input.listingId,
          },
        });
        return addReveiw;
      } catch (error) {
        console.log(error);
      }
    }),
});
