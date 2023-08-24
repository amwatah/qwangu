import ListingCard from "@/components/sections/ListingCard";
import NavigationSlide from "@/components/sections/NavigationSlide";
import { selectedPropertyAtom } from "@/stores";
import { api } from "@/utils/api";
import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import Link from "next/link";

export default function HomePage() {
  const [selectedProperty] = useAtom(selectedPropertyAtom);
  const promotedListings = api.listings.getPromotedListings.useQuery({ limit: 8 });
  const requestedListings = api.listings.getListingsByCategory.useQuery({ listingType: selectedProperty, limit: 4 });

  return (
    <div className="">
      <NavigationSlide />
      <div id="promoted" className=" grid grid-cols-1 gap-2 px-2  pt-[12vh] sm:grid-cols-3 md:grid-cols-4">
        <h4 className=" item-center flex w-full justify-between sm:col-span-3 md:col-span-4">
          <span>Promoted</span>
          <Link href="/listings">
            <Button variant="outline" className="rounded-full">
              View more
            </Button>
          </Link>
        </h4>
        {promotedListings.data?.map((listing) => (
          <ListingCard key={listing.id} listingId={listing.id} />
        ))}
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <h4 id="request" className=" item-center flex w-full justify-between sm:col-span-3 md:col-span-4">
          <span>{selectedProperty}</span>
          <Link href="/listings">
            <Button variant="outline" className="rounded-full">
              View more
            </Button>
          </Link>
        </h4>
        {requestedListings.data?.map((listing) => (
          <ListingCard key={listing.id} listingId={listing.id} />
        ))}
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
        <ListingCard listingId="97c7103c-dc81-46a0-9f56-9fa5b07be216" />
      </div>
    </div>
  );
}
