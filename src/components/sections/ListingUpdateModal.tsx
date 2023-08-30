import { houseAmenitiesItems } from "@/pages/listings/new";
import { api } from "@/utils/api";
import { Button, MultiSelect, NumberInput, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { z } from "zod";

interface ListingUpdateModalProps {
  listingID: string;
}
export default function ListingUpdateModal({ listingID }: ListingUpdateModalProps) {
  const queryClient = api.useContext();
  const listingInfo = api.listings.getListingInfo.useQuery({ listingId: listingID });
  const updateListing = api.listings.updateListing.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Sucess",
        message: "Listing Updated",
      });
      void queryClient.listings.getListingInfo.refetch({ listingId: listingID });
    },
  });

  const updateForm = useForm<{
    vacancies?: number;
    cost?: number;
    location?: string;
    description?: string;
    contact?: string;
    amenities?: string[];
  }>({
    validateInputOnBlur: true,
    initialValues: {
      description: listingInfo.data?.description ? listingInfo.data?.description : "",
      vacancies: listingInfo.data?.vacancies,
      cost: listingInfo.data?.cost,
      location: listingInfo.data?.location,
      contact: listingInfo.data?.contact,
      amenities: listingInfo.data?.amenities,
    },
    validate: zodResolver(
      z.object({
        vacancies: z.number().optional(),
        cost: z.number().gt(0),
        location: z.string().min(3),
        description: z.string().min(5),
        contact: z.string().min(9),
        amenities: z.string().array(),
      })
    ),
  });
  function handleUpdateSubmit(values: typeof updateForm.values) {
    updateListing.mutate({
      listingID: listingID,
      vacancies: values.vacancies,
      cost: values.cost,
      location: values.location,
      description: values.description,
      contact: values.contact,
      amenities: values.amenities,
    });
  }

  return (
    <div>
      <form onSubmit={updateForm.onSubmit((values) => handleUpdateSubmit(values))} className=" flex flex-col gap-1">
        <TextInput label="Location" {...updateForm.getInputProps("location")} />
        <TextInput label="Contact" {...updateForm.getInputProps("contact")} />
        <NumberInput label="Cost" {...updateForm.getInputProps("cost")} />
        <Textarea label="Description" {...updateForm.getInputProps("description")} />
        <MultiSelect
          label="Amenities"
          searchable
          clearable
          {...updateForm.getInputProps("amenities")}
          data={[...houseAmenitiesItems.map((item) => item.amenity)]}
        />
        <Button disabled={!updateForm.isValid()} type="submit">
          Submit Changes
        </Button>
      </form>
    </div>
  );
}
