import ListingCard from "@/components/sections/ListingCard";
import ListingUpdateModal from "@/components/sections/ListingUpdateModal";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";

export default function CreatedListings() {
  const { user } = useUser();
  const queryClient = api.useContext();
  const memberListings = api.listings.getRelatedListings.useQuery({ ownerId: user?.id });
  const deleteListing = api.listings.deleteListing.useMutation();
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-4">
      {memberListings.data?.map((listing) => (
        <section key={listing.id} className=" flex  flex-col gap-2 p-2 shadow-lg">
          <ListingCard listingId={listing.id} />
          <div className=" flex w-full items-center justify-between">
            <Button
              onClick={() => {
                openConfirmModal({
                  title: "Delete Listing ? It will parmanently be removed",
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  centered: true,
                  onCancel: () => console.log("Cancel"),
                  onConfirm: () => {
                    deleteListing.mutate({
                      listingID: listing.id,
                    });
                    void queryClient.listings.getRelatedListings.refetch({ ownerId: user?.id });
                  },
                });
              }}
              color="red"
            >
              Delete
            </Button>
            <Button
              onClick={() =>
                openModal({
                  children: <ListingUpdateModal listingID={listing.id} />,
                  centered: true,
                })
              }
            >
              Update
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
