import ListingCard from "@/components/sections/ListingCard";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { Button, LoadingOverlay, NumberInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useState } from "react";

export default function BookingsPage() {
  const [mpesaNumber, setMpesaNumber] = useState<number>();
  const { user } = useUser();
  const bookedListings = api.bookings.getBookedListings.useQuery({ memberId: user?.id ?? "" });
  const deleteBookedListing = api.bookings.deleteBookedListing.useMutation({
    onSuccess: () => {
      void bookedListings.refetch();
    },
  });
  const payForBookedListing = api.bookings.payForBookedListing.useMutation({
    onSuccess: () => {
      showNotification({
        message: "You have paid for a spot on this property",
      });
      void bookedListings.refetch();
    },
  });

  return (
    <div className=" grid grid grid-cols-1 gap-2 sm:grid-cols-4">
      <LoadingOverlay visible={bookedListings.isLoading || payForBookedListing.isLoading || deleteBookedListing.isLoading} />
      {bookedListings.data?.length
        ? bookedListings.data.map((listing) => (
            <section key={listing.id} className=" flex  flex-col gap-2 p-2 shadow-lg">
              <ListingCard listingId={listing.listingId} />
              <div className=" flex w-full items-center justify-between">
                <Button
                  onClick={() => {
                    openConfirmModal({
                      title: "Remove from booked listings ?",
                      labels: { confirm: "Confirm", cancel: "Cancel" },
                      centered: true,
                      onCancel: () => console.log("Cancel"),
                      onConfirm: () => {
                        deleteBookedListing.mutate({
                          bookingId: listing.id,
                        });
                      },
                    });
                  }}
                  color="red"
                >
                  Delete
                </Button>
                <Button
                  disabled={listing.paid}
                  onClick={() => {
                    openConfirmModal({
                      title: "Make payment ?",
                      children: (
                        <div className=" flex flex-col gap-y-1">
                          <LoadingOverlay visible={payForBookedListing.isLoading} />
                          <p>M-pesa intergration is not implemented yet.</p>
                          <p>Inputing your phone number won&apos;t intiate any transactions.</p>
                          <NumberInput
                            value={mpesaNumber}
                            onChange={(e) => (typeof e === "number" ? setMpesaNumber(e) : 0)}
                            description="Mpesa number"
                            placeholder="07...."
                          />
                        </div>
                      ),
                      labels: { confirm: "Confirm", cancel: "Cancel" },
                      centered: true,
                      onCancel: () => console.log("Cancel"),
                      onConfirm: () => {
                        payForBookedListing.mutate({
                          bookingId: listing.id,
                          listingID: listing.listingId,
                        });
                      },
                    });
                  }}
                >
                  {listing.paid ? "Paid" : "Payment"}
                </Button>
              </div>
            </section>
          ))
        : !bookedListings.isLoading && (
            <div className=" mt-8 flex flex-col items-center justify-center sm:col-span-4">
              <p>No booked listings</p>
              <Link href="/listings">
                <Button>Explore</Button>
              </Link>
            </div>
          )}
    </div>
  );
}
