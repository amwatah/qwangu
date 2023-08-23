import ListingCard from "@/components/sections/ListingCard";
import NavigationSlide from "@/components/sections/NavigationSlide";

export default function HomePage() {
  return (
    <div className="">
      <NavigationSlide />
      <div className=" grid grid-cols-1 gap-2 px-2  pt-[12vh] sm:grid-cols-3 md:grid-cols-4">
        <h4 className=" sm:col-span-3 md:col-span-4">Promoted</h4>
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
      </div>
    </div>
  );
}
