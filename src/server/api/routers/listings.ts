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
        amenities: z.string().array(),
        contact: z.string(),
        creatorId: z.string(),
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
            extras: input.extras,
            description: input.description,
            vacancies: input.vacancies,
            amenities: input.amenities,
            contact: input.contact,
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
});
