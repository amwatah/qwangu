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
  getBookedListings: publicProcedure
    .input(
      z.object({
        memberId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const bookedListings = await ctx.prisma.booking.findMany({
          where: {
            memberId: input.memberId,
          },
        });
        return bookedListings;
      } catch (error) {
        console.log(error);
      }
    }),
  deleteBookedListing: publicProcedure
    .input(
      z.object({
        bookingId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const bookedListingDeletion = await ctx.prisma.booking.delete({
          where: {
            id: input.bookingId,
          },
        });
        return bookedListingDeletion.id;
      } catch (error) {
        console.log(error);
      }
    }),

  payForBookedListing: publicProcedure
    .input(
      z.object({
        bookingId: z.number(),
        listingID: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const bookedListingPayment = await ctx.prisma.$transaction([
          ctx.prisma.listing.update({
            where: {
              id: input.listingID,
            },
            data: {
              vacancies: {
                decrement: 1,
              },
            },
          }),
          ctx.prisma.booking.update({
            where: {
              id: input.bookingId,
            },
            data: {
              paid: true,
            },
          }),
        ]);
        return bookedListingPayment[0].id;
      } catch (error) {
        console.log(error);
      }
    }),
});
