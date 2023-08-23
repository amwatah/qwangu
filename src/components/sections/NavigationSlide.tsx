import Link from "next/link";
import { BiSolidSchool, BiBed } from "react-icons/bi";
import { MdApartment, MdOutlineHouse } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";

import { BsSearch } from "react-icons/bs";
import { Input, Paper } from "@mantine/core";

export default function NavigationSlide() {
  return (
    <Paper className="  grid-col-1  container  fixed top-[7vh]   mx-auto grid pb-0 pt-4 shadow-none sm:top-[8vh]">
      <div className=" flex w-full justify-center  sm:hidden">
        <Input placeholder="I'm searching for... " className=" mx-auto w-[95%]" rightSection={<BsSearch />} radius="xl" />
      </div>
      <div className="flex w-full gap-x-1  overflow-x-scroll  sm:justify-center">
        <Link href="/" className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <BiSolidSchool size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" text-sm ">Hostels</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="/" className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <BiBed size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" text-sm ">Bedsitters</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="/" className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <MdOutlineHouse size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" text-sm ">Singles</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="/" className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <MdApartment size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" whitespace-nowrap  text-sm">1-3 BDR</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
        <Link href="/" className=" group flex flex-col items-center justify-center  p-2">
          <span>
            <HiOutlineHomeModern size={20} className=" group-hover:animate-pulse " />
          </span>
          <p className=" whitespace-nowrap  text-sm">For Sale</p>
          <hr className=" hidden w-full group-hover:inline group-focus:inline" />
        </Link>
      </div>
    </Paper>
  );
}
