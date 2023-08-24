import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ListingsRouter = createTRPCRouter({
  createNewListing: publicProcedure
    .input(
      z.object({
        name: z.string(),
        county: z.string(),
        town: z.string(),
        location: z.string(),
        listingType: z.string(),
        cost: z.number(),
        extras: z.string().optional().default(""),
        description: z.string().optional().default(""),
        vacancies: z.number().gt(0),
        isForSale: z.boolean(),
        amenities: z.string().array(),
        contact: z.string(),
        creatorId: z.string(),
        uploadedImages: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const addNewListing = await ctx.prisma.listing.create({
          data: {
            name: input.name,
            county: input.county,
            town: input.town,
            location: input.location,
            propertyType: input.listingType,
            cost: input.cost,
            bedRooms:
              input.listingType === "1 Bedroom"
                ? 1
                : input.listingType === "2 Bedroom"
                ? 2
                : input.listingType === "3 Bedroom"
                ? 3
                : input.listingType === "4+ Bedroom"
                ? 4
                : 0,
            description: input.description,
            vacancies: input.vacancies,
            amenities: input.amenities,
            isForSale: input.isForSale,
            contact: input.contact,
            uploadedImages: input.uploadedImages,
            member: {
              connectOrCreate: {
                where: {
                  id: input.creatorId,
                },
                create: {
                  id: input.creatorId,
                },
              },
            },
          },
        });
        return addNewListing;
      } catch (error) {
        console.log(error);
      }
    }),

  getListingInfo: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const listingInfo = await ctx.prisma.listing.findUnique({
          where: {
            id: input.listingId,
          },
        });
        return listingInfo;
      } catch (error) {
        console.log(error);
      }
    }),

  getPromotedListings: publicProcedure
    .input(
      z.object({
        limit: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const promotedListings = await ctx.prisma.listing.findMany({
          select: {
            id: true,
          },
          take: input.limit,
          orderBy: {
            createdAt: "desc",
          },
        });
        return promotedListings;
      } catch (error) {
        console.log(error);
      }
    }),

  getListingsByCategory: publicProcedure
    .input(
      z.object({
        listingType: z.string(),
        limit: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: {
            propertyType: input.listingType,
          },
          select: {
            id: true,
          },
          take: input.limit,
          orderBy: {
            createdAt: "desc",
          },
        });
        return listings;
      } catch (error) {
        console.log(error);
      }
    }),
});
