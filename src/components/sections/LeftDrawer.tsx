import { drawerOpenAtom } from "@/stores";
import { Drawer, NavLink } from "@mantine/core";
import { BiSolidSchool, BiBed } from "react-icons/bi";
import { MdOutlineBedroomChild, MdApartment, MdOutlineAddHomeWork, MdQuestionMark, MdOutlineCall, MdOutlinePrivacyTip } from "react-icons/md";
import { FaQ, FaHandshakeSimple } from "react-icons/fa6";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useAtom } from "jotai";
import Link from "next/link";
export default function LeftDrawer() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);

  return (
    <>
      <Drawer
        size="xs"
        opened={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        title="Qwangu"
      >
        <h4>Categories</h4>
        <Link href="/">
          <NavLink label="Hostels" icon={<BiSolidSchool size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="Bedsitters" icon={<BiBed size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="Single Rooms" icon={<MdOutlineBedroomChild size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="1,2,3+ Bedrooms" icon={<MdApartment size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="For Sale" icon={<HiOutlineHomeModern size={20} className=" text-rose-600" />} />
        </Link>
        <hr />
        <Link href="/">
          <NavLink label="Add Listing" icon={<MdOutlineAddHomeWork size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="About  Us " icon={<MdQuestionMark size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="Contact Us" icon={<MdOutlineCall size={20} className=" text-rose-600" />} />
        </Link>
        <hr />
        <Link href="/">
          <NavLink label="Privacy Policy" icon={<MdOutlinePrivacyTip size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="Terms & Conditions" icon={<FaHandshakeSimple size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/">
          <NavLink label="FAQs" icon={<FaQ size={20} className=" text-rose-600" />} />
        </Link>
      </Drawer>
    </>
  );
}
