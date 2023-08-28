import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookingsRouter = createTRPCRouter({
  addListingBooking: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
        memberId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const addBooking = await ctx.prisma.booking.create({
          data: {
            listingId: input.listingId,
            member: {
              connectOrCreate: {
                create: {
                  id: input.memberId,
                },
                where: {
                  id: input.memberId,
                },
              },
            },
          },
        });
        return addBooking.id;
      } catch (error) {
        console.log(error);
      }
    }),
});
