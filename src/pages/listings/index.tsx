import ListingCard from "@/components/sections/ListingCard";
import { api } from "@/utils/api";
import { kenyanCounties, typesOfProperties } from "@/utils/constansts";
import { Loader, NumberInput, Paper, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ListingsPage() {
  const filterForm = useForm<{
    county?: string;
    minPrice?: number;
    maxPrice?: number;
    listingType?: string;
    locale?: string;
  }>();

  const matchedListings = api.listings.getFilteredListings.useQuery({
    county: filterForm.values.county,
    locale: filterForm.values.locale,
    listingType: filterForm.values.listingType,
    minPrice: filterForm.values.minPrice,
    maxPrice: typeof filterForm.values.maxPrice === "number" ? filterForm.values.maxPrice : undefined,
    limit: 24,
  });

  return (
    <div className=" relative">
      <Paper className="  w-full ">
        <form className="  z-50 my-2 grid w-full grid-cols-1 gap-2  sm:grid-cols-5">
          <Select searchable description="County" {...filterForm.getInputProps("county")} data={kenyanCounties} />
          <Select searchable description="Type" {...filterForm.getInputProps("listingType")} data={typesOfProperties} />
          <TextInput description="Around.." {...filterForm.getInputProps("locale")} />
          <NumberInput description="MIN PRICE" step={1000} type="number" {...filterForm.getInputProps("minPrice")} />
          <NumberInput description="MAX PRICE" step={1000} type="number" {...filterForm.getInputProps("maxPrice")} />
        </form>
      </Paper>
      {matchedListings.isLoading && (
        <div className=" flex w-full items-center justify-center">
          <Loader />
        </div>
      )}

      <section className="grid w-full grid-cols-1 gap-2 p-2 sm:grid-cols-4">
        {matchedListings.data?.length ? (
          matchedListings.data.map((listing) => (
            <>
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
              <ListingCard key={listing.id} listingId={listing.id} />
            </>
          ))
        ) : (
          <>
            {!matchedListings.isLoading && (
              <div className=" flex w-full justify-center  py-8 sm:col-span-4">NO LISTINGS MATCHED YOUR SEARCH !!! REFINE YOUR FILTERS</div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
