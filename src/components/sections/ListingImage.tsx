import { storageBucket } from "@/utils/firestoreConfig";
import { LoadingOverlay } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { ref } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";

interface ListingImageProps {
  listingName: string;
  imageId: number;
}
export default function ListingImage({ imageId, listingName }: ListingImageProps) {
  const [logoUrl, loading, error] = useDownloadURL(ref(storageBucket, `listings/${listingName.split(" ").join("")}/${imageId}`));
  return (
    <div>
      <LoadingOverlay visible={loading} />
      {!error ? (
        <img
          className=" h-48 w-48 object-cover rounded-md "
          onClick={() => {
            openModal({
              children: (
                <div className="h-[50vh] w-full">
                  <img src={logoUrl} className=" h-full w-full  object-cover  " alt=" modal Image" />
                </div>
              ),
              centered: true,
            });
          }}
          src={logoUrl}
          alt="listing image"
        />
      ) : (
        <img
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=" not found"
        />
      )}
    </div>
  );
}
