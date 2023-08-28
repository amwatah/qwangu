import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/listings",
    "/api/trpc/listings.getListingInfo,listings.getPromotedListings,listings.getListingsByCategory",
    "/api/trpc/listings.getListingInfo",
    "/api/trpc/listings.getPromotedListings,listings.getListingInfo",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
