import Link from "next/link";
import { BiSolidSchool, BiBed } from "react-icons/bi";
import { MdApartment, MdOutlineHouse } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";

import { BsSearch } from "react-icons/bs";
import { Button, Input, Paper } from "@mantine/core";
import { useAtom } from "jotai";
import { globalSearchValueAtom, selectedPropertyAtom } from "@/stores";
import { useRouter } from "next/router";

export default function NavigationSlide() {
  const router = useRouter();
  const [, setSelectedProperty] = useAtom(selectedPropertyAtom);
  const [globalSearchValue, setGlobalSearchValue] = useAtom(globalSearchValueAtom);
  return (
    <Paper className="  grid-col-1    left-0 top-[7vh]   z-[100] mx-auto grid w-screen pb-0 pt-4 shadow-none sm:top-[8vh]">
      <div className=" flex w-full justify-center  sm:hidden">
        <Input
          value={globalSearchValue}
          onChange={(e) => setGlobalSearchValue(e.target.value)}
          placeholder="I'm searching for... "
          className=" mx-auto w-[95%]"
          rightSection={
            <Button onClick={() => void router.push("/listings")} className=" rounded-full" color="blue">
              <BsSearch />
            </Button>
          }
          radius="xl"
        />
      </div>
      <div className=" flex w-full justify-center  gap-x-1 overflow-x-scroll">
        <Link href="#request" onClick={() => setSelectedProperty("Hostel")} className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <BiSolidSchool size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" text-sm ">Hostels</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="#request" onClick={() => setSelectedProperty("Bedsitter")} className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <BiBed size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" text-sm ">Bedsitters</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="#request" onClick={() => setSelectedProperty("1 Bedroom")} className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <MdOutlineHouse size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" text-sm ">1 BDR</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="#request" onClick={() => setSelectedProperty("2 Bedroom")} className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <MdApartment size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" whitespace-nowrap  text-sm">2 BDR</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="#request" onClick={() => setSelectedProperty("3 Bedroom")} className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <HiOutlineHomeModern size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" whitespace-nowrap  text-sm">3+ BDR</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
      </div>
    </Paper>
  );
}
