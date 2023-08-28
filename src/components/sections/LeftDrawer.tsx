import { drawerOpenAtom, selectedPropertyAtom } from "@/stores";
import { Drawer, NavLink } from "@mantine/core";
import { BiSolidSchool, BiBed } from "react-icons/bi";
import { MdOutlineBedroomChild, MdApartment, MdOutlineAddHomeWork, MdQuestionMark, MdOutlineCall, MdOutlinePrivacyTip } from "react-icons/md";
import { FaQ, FaHandshakeSimple } from "react-icons/fa6";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useAtom } from "jotai";
import Link from "next/link";
import { BsFillHousesFill } from "react-icons/bs";
export default function LeftDrawer() {
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const [selectedProperty, setSelectedProperty] = useAtom(selectedPropertyAtom);

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
        <Link href="/#request" onClick={() => setSelectedProperty("Hostel")}>
          <NavLink label="Hostels" icon={<BiSolidSchool size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/#request" onClick={() => setSelectedProperty("Bedsitter")}>
          <NavLink label="Bedsitters" icon={<BiBed size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/#request" onClick={() => setSelectedProperty("1 Bedroom")}>
          <NavLink label="1 Bedroom" icon={<MdOutlineBedroomChild size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/#request" onClick={() => setSelectedProperty("2 Bedroom")}>
          <NavLink label="2 Bedroom" icon={<MdApartment size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/#request" onClick={() => setSelectedProperty("3 Bedroom")}>
          <NavLink label="3+ Bedroom" icon={<HiOutlineHomeModern size={20} className=" text-rose-600" />} />
        </Link>
        <hr />
        <Link href="/listings/new">
          <NavLink label="Add Listing" icon={<MdOutlineAddHomeWork size={20} className=" text-rose-600" />} />
        </Link>
        <Link href="/listings">
          <NavLink label="Listings" icon={<BsFillHousesFill size={20} className=" text-rose-600" />} />
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
