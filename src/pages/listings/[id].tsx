import { api } from "@/utils/api";
import { storageBucket } from "@/utils/firestoreConfig";
import { Button, CopyButton, LoadingOverlay, Paper, Text, TextInput } from "@mantine/core";
import { ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { houseAmenitiesItems } from "./new";
import ListingImage from "@/components/sections/ListingImage";
import { MdShare } from "react-icons/md";
import ListingCard from "@/components/sections/ListingCard";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useUser } from "@clerk/nextjs";
import { openConfirmModal } from "@mantine/modals";

export default function SingleListingPage() {
  const { user } = useUser();
  const listingId = useRouter().query.id;
  const router = useRouter();
  const listingInfo = api.listings.getListingInfo.useQuery({ listingId: listingId as string });
  const similarListings = api.listings.getRelatedListings.useQuery({ propertyType: listingInfo.data?.propertyType });
  const listingsBySameOwner = api.listings.getRelatedListings.useQuery({ ownerId: listingInfo.data?.memberId });
  const listingReviews = api.reviews.getListingReviews.useQuery({ listingId: listingId as string });
  const addReveiw = api.reviews.addReveiw.useMutation();
  const bookListing = api.bookings.addListingBooking.useMutation({
    onSuccess: () => {
      openConfirmModal({
        title: "Space  Booked",
        children: <>You have booked a spot on this listing . Proceed to payment ?</>,
        labels: { confirm: "Checkout", cancel: "Cancel" },
        onCancel: () => console.log("Cancel"),
        onConfirm: () => void router.push("/mybookings"),
        centered: true,
      });
    },
  });
  const [logoUrl, , error] = useDownloadURL(ref(storageBucket, `listings/${listingInfo.data?.name.split(" ").join("")}/${0}`));

  const [reveiwMessage, setReveiwMessage] = useState("");
  return (
    <div className=" grid grid-cols-1 gap-y-2 sm:grid-cols-2">
      <section className=" order-2 py-2 sm:order-1 sm:col-span-2">
        <div className="">
          <h2>{listingInfo.data?.name}</h2>
        </div>
        <Text color="dimmed" className=" flex gap-x-4 text-sm">
          <span>{listingInfo.data?.createdAt.toLocaleString()}</span>
          <span>
            {listingInfo.data?.county} ,{listingInfo.data?.town} ,{listingInfo.data?.location}{" "}
          </span>
        </Text>
      </section>
      <section className=" order-1 ">
        {listingInfo.data && listingInfo.data.uploadedImages > 0 && !error ? (
          <img alt="Home" src={logoUrl} className=" h-[30vh] w-full rounded-md object-cover group-hover:animate-twPulse sm:h-full sm:min-h-[50vh]" />
        ) : (
          <img
            alt="Home"
            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className=" h-[30vh] w-full  rounded-md object-cover group-hover:animate-twPulse sm:h-full sm:min-h-[50vh]"
          />
        )}
      </section>
      <section className=" order-3 flex flex-col sm:px-2">
        <p className="flex items-center justify-between">
          <span className="">Property Type</span>
          <span className="">{listingInfo.data?.propertyType}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="">Purpose</span>
          <span className="">{listingInfo.data?.isForSale ? "For Sale" : "For Rent"}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="">Vacancies</span>
          <span className="">{listingInfo.data?.vacancies}</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="">Cost</span>
          <span className="">{listingInfo.data?.cost}</span>
        </p>
        <div className=" py-2">
          <h4>Amenities</h4>
          <div className="grid grid-cols-2 gap-1">
            {listingInfo.data?.amenities?.map((value) => (
              <div key={value} className=" flex items-center  gap-x-4">
                <span>{houseAmenitiesItems.filter((amenityItem) => amenityItem.amenity === value).at(0)?.icon}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex w-full  justify-end">
          {listingInfo.data?.vacancies && listingInfo.data.vacancies > 1 ? (
            <>
              <LoadingOverlay visible={bookListing.isLoading} />
              <Button
                onClick={() => {
                  bookListing.mutate({
                    listingId: listingInfo.data?.id ?? "",
                    memberId: user?.id ?? "",
                  });
                }}
              >
                Book Space
              </Button>
            </>
          ) : (
            <p className="">No vacancies currently ! Check again later</p>
          )}
        </div>
      </section>
      <section className=" order-3  sm:col-span-2">
        <h4>Description/More Info</h4>
        <p>{listingInfo.data?.description}</p>
      </section>
      <section className=" order-3  my-2 flex flex-nowrap gap-2 overflow-x-scroll sm:col-span-2">
        {listingInfo.data?.uploadedImages &&
          Array.from({ length: listingInfo.data.uploadedImages }, (_, index) => index + 1).map((imagePos, index) => (
            <ListingImage key={imagePos} imageId={index} listingName={listingInfo.data?.name ?? ""} />
          ))}
      </section>
      <section className=" order-3  sm:col-span-2">
        <CopyButton value={`http://localhost:3000/listings/${listingId as string}`}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy} leftIcon={<MdShare />}>
              {copied ? "Copied url" : "Share"}
            </Button>
          )}
        </CopyButton>
      </section>
      <section className=" order-3  flex flex-col gap-y-2 sm:col-span-2">
        <div className="flex items-center justify-start gap-x-1">
          <TextInput
            value={reveiwMessage}
            onChange={(e) => setReveiwMessage(e.target.value)}
            placeholder="Add annoymous reveiw"
            radius="xl"
            className=" w-[95%] sm:w-[30vw]"
            rightSection={
              <Button
                onClick={() => {
                  addReveiw.mutate({
                    listingId: listingInfo.data?.id ?? "",
                    memberId: user?.id ?? "",
                    reveiwMessage: reveiwMessage,
                  });
                  if (addReveiw.isSuccess) {
                    void listingReviews.refetch();
                  }
                }}
                className="rounded-full"
              >
                Reveiw
              </Button>
            }
          />
        </div>
        <div className="grid-col-1 grid max-h-[30vh] gap-2 overflow-y-scroll sm:grid-cols-2">
          {listingReviews.data?.reviews.map((reveiw) => (
            <Paper key={reveiw.id} withBorder className="flex flex-col p-2 py-4">
              <div className="my-1  flex justify-between">
                <CgProfile size={24} />
                <p>{reveiw.createdAt.toLocaleString()}</p>
              </div>
              <hr />
              <p>{reveiw.message}</p>
            </Paper>
          ))}
        </div>
      </section>
      <section className=" order-3  grid grid-cols-1 sm:col-span-2 sm:grid-cols-4">
        <h3 className=" sm:col-span-4">Listings from same Owner</h3>
        {listingsBySameOwner.data?.map((listing, index) => (
          <ListingCard key={index} listingId={listing.id} />
        ))}
      </section>
      <section className=" order-3  grid grid-cols-1 sm:col-span-2 sm:grid-cols-4">
        <h3 className=" sm:col-span-4">Similar Listings</h3>
        {similarListings.data?.map((listing, index) => (
          <ListingCard key={index} listingId={listing.id} />
        ))}
      </section>
    </div>
  );
}
