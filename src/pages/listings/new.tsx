import { kenyanCounties } from "@/utils/constansts";
import { Button, Checkbox, Image, NumberInput, Paper, Select, SimpleGrid, Stepper, TextInput, Textarea } from "@mantine/core";
import { type ReactNode, useState } from "react";
import { MdWifi, MdOutlineWaterDrop, MdLocalParking, MdOutlineBalcony, MdOutlineDoorSliding, MdOutlineLock } from "react-icons/md";
import { FaSink, FaPaintRoller } from "react-icons/fa";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { Dropzone, IMAGE_MIME_TYPE, type FileWithPath } from "@mantine/dropzone";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

export default function NewListingPage() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const form = useForm<{
    name: string;
    county: string;
    town: string;
    location: string;
    listingType: string;
    cost: string;
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
      })
    ),
  });
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image alt="preview" key={index} src={imageUrl} imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }} />;
  });
  return (
    <main className=" container mx-auto w-full ">
      <form
        onSubmit={form.onSubmit(() => {
          console.log("done");
        })}
      >
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
          <Stepper.Step description="Listing Info">
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TextInput {...form.getInputProps("name")} label="AD title /Property Name" withAsterisk required />
              <Select {...form.getInputProps("listingType")} data={["Bedsitter", "Single"]} label="Property Type" withAsterisk required />
              <TextInput {...form.getInputProps("contact")} label="Phone number" withAsterisk required />
              <Select {...form.getInputProps("county")} data={kenyanCounties} label="County" withAsterisk required />
              <TextInput {...form.getInputProps("town")} label="Town" withAsterisk required />
              <TextInput {...form.getInputProps("location")} label="Street/Specific location" withAsterisk required />
              <TextInput {...form.getInputProps("cost")} label="Monthly Payment/Cost" withAsterisk required />
              <TextInput {...form.getInputProps("extras")} label="Extra payments ?Indicate" />
              <NumberInput {...form.getInputProps("vacancies")} label="Available Vacancies" withAsterisk required />
              <Textarea label="Description (relevant info not captured)" className=" sm:col-span-3" autosize minRows={3} />
              <div className=" flex items-center justify-end sm:col-span-3">
                <Button type="button" onClick={() => nextStep()}>
                  Next
                </Button>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step description="Amenities">
            <Paper className="  grid w-full  grid-cols-1   gap-y-4 shadow-lg sm:grid-cols-2 ">
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
          <Stepper.Step description="Image Uploados">
            <div className="">
              <Dropzone accept={IMAGE_MIME_TYPE} maxFiles={10} onDrop={(newFiles) => setFiles([...files, ...newFiles])} multiple>
                <p className="">Drop atleast 3 images of the listing</p>
              </Dropzone>
              {files.length}
              <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 1 }]} mt={previews.length > 0 ? "xl" : 0}>
                {previews}
              </SimpleGrid>
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
