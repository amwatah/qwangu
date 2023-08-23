import { kenyanCounties, typesOfProperties } from "@/utils/constansts";
import { Button, Checkbox, FileInput, LoadingOverlay, NumberInput, Paper, Select, Stepper, TextInput, Textarea } from "@mantine/core";
import { type ReactNode, useState } from "react";
import { MdWifi, MdOutlineWaterDrop, MdLocalParking, MdOutlineBalcony, MdOutlineDoorSliding, MdOutlineLock } from "react-icons/md";
import { FaSink, FaPaintRoller } from "react-icons/fa";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { useForm, zodResolver } from "@mantine/form";
import { useUploadFile } from "react-firebase-hooks/storage";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { api } from "@/utils/api";
import { showNotification } from "@mantine/notifications";
import { ref } from "firebase/storage";
import { storageBucket } from "@/utils/firestoreConfig";

export default function NewListingPage() {
  const { user } = useUser();
  const createNewListing = api.listings.createNewListing.useMutation();
  const [uploadFile, uploading] = useUploadFile();
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<{
    name: string;
    county: string;
    town: string;
    location: string;
    listingType: string;
    cost: number;
    extras: string;
    description: string;
    vacancies: number;
    amenities: string[];
    contact: string;
  }>({
    validateInputOnBlur: true,
    validate: zodResolver(
      z.object({
        name: z.string().nonempty().min(3),
        county: z.string().nonempty(),
        town: z.string().nonempty().min(3),
        location: z.string().nonempty().min(3),
        listingType: z.string().nonempty(),
        vacancies: z.number().nonnegative().gt(0),
        contact: z.string().nonempty().min(9),
        description: z.string().min(6, "Short description ,give more details").optional(),
        cost: z.number().nonnegative().gt(0),
      })
    ),
  });

  function handleSubmit(values: typeof form.values) {
    if (selectedFiles.length) {
      selectedFiles.forEach((file, index) => {
        void (async () => {
          const uploadResult = await uploadFile(ref(storageBucket, `listings/${values.name.split(" ").join("")}/${index}`), file);
          console.log(uploadResult?.metadata);
        })();
      });
      createNewListing.mutate(
        {
          creatorId: user?.id ?? "",
          name: values.name,
          county: values.county,
          town: values.town,
          location: values.location,
          listingType: values.listingType,
          cost: values.cost,
          extras: values.extras,
          description: values.description,
          vacancies: values.vacancies,
          amenities: values.amenities,
          contact: values.contact,
          uploadedImages: selectedFiles.length,
        },
        {
          onSettled: (data, error) => {
            if (data) {
              showNotification({
                title: "Sucess",
                message: "Your listing has been added",
              });
            }
            if (error) {
              showNotification({
                title: "Error",
                message: error.message,
              });
            }
          },
        }
      );
    } else {
    }
  }

  return (
    <main className=" container mx-auto min-h-screen w-full ">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <LoadingOverlay visible={createNewListing.isLoading || uploading} />
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
          <Stepper.Step description="Listing Info">
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TextInput {...form.getInputProps("name")} label="AD title /Property Name" withAsterisk required />
              <Select {...form.getInputProps("listingType")} data={typesOfProperties} label="Property Type" searchable withAsterisk required />
              <TextInput {...form.getInputProps("contact")} label="Phone number" withAsterisk required />
              <Select {...form.getInputProps("county")} data={kenyanCounties} label="County" searchable withAsterisk required />
              <TextInput {...form.getInputProps("town")} label="Town" withAsterisk required />
              <TextInput {...form.getInputProps("location")} label="Street/Specific location" withAsterisk required />
              <NumberInput {...form.getInputProps("cost")} label="Monthly Payment/Cost" withAsterisk required />
              <TextInput {...form.getInputProps("extras")} label="Extra payments ?Indicate" />
              <NumberInput {...form.getInputProps("vacancies")} label="Available Vacancies" withAsterisk required />
              <Textarea
                {...form.getInputProps("description")}
                label="Description (relevant info not captured)"
                className=" sm:col-span-3"
                autosize
                minRows={3}
              />
              <div className=" flex items-center justify-end sm:col-span-3">
                {form.isDirty() &&
                form.isValid("name") &&
                form.isValid("listingType") &&
                form.isValid("contact") &&
                form.isValid("county") &&
                form.isValid("town") &&
                form.isValid("county") &&
                form.isValid("cost") &&
                form.isValid("vacancies") &&
                form.isValid("description") ? (
                  <Button type="button" onClick={() => nextStep()}>
                    Next
                  </Button>
                ) : (
                  <Button disabled type="button" onClick={() => nextStep()}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step description="Amenities">
            <Paper className="  grid w-full  grid-cols-1   gap-y-4 p-2 shadow-lg  sm:grid-cols-2">
              <div className=" flex flex-col p-4">
                <p>Select Available amenities</p>
                <Checkbox.Group {...form.getInputProps("amenities")}>
                  {houseAmenitiesItems.map((item) => (
                    <Checkbox size="lg" key={item.amenity} label={item.amenity} value={item.amenity} className=" m-6" />
                  ))}
                </Checkbox.Group>
              </div>
              <div className="  grid  grid-cols-3 place-content-start gap-1">
                <p className=" col-span-3">Selected perks</p>
                {form.values.amenities?.map((value) => (
                  <Paper
                    key={value}
                    withBorder
                    className=" flex h-24 flex-col items-center justify-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                  >
                    <span>{houseAmenitiesItems.filter((amenityItem) => amenityItem.amenity === value).at(0)?.icon}</span>
                    <span>{value}</span>
                  </Paper>
                ))}
              </div>
              <div className=" flex items-center justify-between sm:col-span-2">
                <Button type="button" onClick={() => prevStep()}>
                  Prev
                </Button>
                <Button type="button" onClick={() => nextStep()}>
                  Next
                </Button>
              </div>
            </Paper>
          </Stepper.Step>
          <Stepper.Step description="Image Uploads">
            <div className="mx-auto flex w-full flex-col justify-center sm:w-1/2">
              <div className=" m-1 my-4">
                <FileInput
                  label="Upload atleast 1 Image of your property"
                  value={selectedFiles}
                  onChange={(files) => setSelectedFiles([...selectedFiles, ...files])}
                  multiple
                  clearable
                  capture="user"
                  className=" w-full"
                />
              </div>
              <div className="">
                {selectedFiles.length > 0 && (
                  <div className="">
                    <div className="  flex  items-center gap-x-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className=" h-52 ">
                          {file.type.startsWith("image/") ? (
                            <img className="  max-h-full max-w-full" src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                          ) : (
                            <p>{file.name}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className=" my-2 flex w-full items-center justify-between">
                <Button type="button" onClick={() => prevStep()}>
                  Prev
                </Button>
                <Button disabled={!selectedFiles.length} type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
        </Stepper>
      </form>
    </main>
  );
}

const houseAmenitiesItems: { amenity: string; icon: ReactNode }[] = [
  {
    amenity: "Wifi",
    icon: <MdWifi />,
  },
  {
    amenity: "Water",
    icon: <MdOutlineWaterDrop />,
  },
  {
    amenity: "Parking",
    icon: <MdLocalParking />,
  },
  {
    amenity: "Balcony",
    icon: <MdOutlineBalcony />,
  },
  {
    amenity: "Drawers",
    icon: <RiArchiveDrawerLine />,
  },
  {
    amenity: "Sinks",
    icon: <FaSink />,
  },
  {
    amenity: "wardrobe",
    icon: <MdOutlineDoorSliding />,
  },

  {
    amenity: "Furnishing",
    icon: <FaPaintRoller />,
  },
  {
    amenity: "Security",
    icon: <MdOutlineLock />,
  },
];
