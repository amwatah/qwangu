import { api } from "@/utils/api";
import { storageBucket } from "@/utils/firestoreConfig";
import { LoadingOverlay, Text } from "@mantine/core";
import { ref } from "firebase/storage";
import Link from "next/link";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { VscVerified } from "react-icons/vsc";

interface ListingCardProps {
  listingId: string;
}
export default function ListingCard({ listingId }: ListingCardProps) {
  const listingInfo = api.listings.getListingInfo.useQuery({ listingId });
  const [logoUrl, loading, error] = useDownloadURL(ref(storageBucket, `listings/${listingInfo.data?.name.split(" ").join("")}/${0}`));
  return (
    <Link href={`/listings/${listingId}`} className="group relative  rounded-lg p-4 shadow-sm shadow-indigo-100">
      {listingInfo.data?.verified && <VscVerified size={24} className=" absolute right-[5%] top-[5%] z-50 text-green-500" />}
      {listingInfo.data?.uploadedImages ? (
        listingInfo.data.uploadedImages > 0 && !loading && !error ? (
          <img alt="Logo" src={logoUrl} className="h-56 w-full rounded-md object-cover group-hover:animate-twPulse" />
        ) : (
          <>
            <LoadingOverlay visible={loading} />
            <img
              alt="Home"
              src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-56 w-full rounded-md object-cover group-hover:animate-twPulse"
            />
          </>
        )
      ) : (
        <img
          alt="Home"
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full rounded-md object-cover group-hover:animate-twPulse"
        />
      )}

      <div className="mt-2 ">
        <dl>
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="flex items-center justify-between">
              <p className=" font-bold">{listingInfo.data?.name}</p>
              <Text color="dimmed" className=" text-xs">
                ({listingInfo.data?.propertyType})
              </Text>
            </dd>
          </div>

          <div>
            <dt className="sr-only">Address</dt>
            <dd className=" text-sm">
              {listingInfo.data?.town} , {listingInfo.data?.county}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Location</dt>
            <dd className=" text-xs">
              <Text color="dimmed">{listingInfo.data?.location}</Text>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="flex items-center justify-between text-sm ">
              <Text color="blue" className="font-bold group-hover:animate-tada ">
                {listingInfo.data?.cost}
              </Text>
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
