import { Burger, Button, Menu, NavLink, TextInput } from "@mantine/core";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { BsSearch, BsHouseCheck, BsHouseHeart } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { drawerOpenAtom } from "@/stores";

export default function Header() {
  const { user } = useUser();
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);

  return (
    <div className=" flex items-center justify-between p-1 px-2 shadow-lg">
      <Burger
        opened={drawerOpen}
        onClick={() => {
          setDrawerOpen(true);
        }}
        size="sm"
        className=" sm:hidden"
      />
      <Link href="/" className=" grow text-center font-bold text-rose-600 sm:grow-0 sm:text-lg">
        Qwangu
      </Link>
      <TextInput placeholder="I am searching for..." className=" hidden w-56 sm:inline-flex" rightSection={<BsSearch />} radius="xl" />
      <div className=" flex items-center">
        {user ? (
          <Link href="/listings/new">
            <Button className=" hidden rounded-full sm:inline-flex" size="xs">
              Add Listing
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button className=" hidden rounded-full sm:inline-flex" size="xs">
              Sign Up
            </Button>
          </SignInButton>
        )}

        <div className=" flex items-center gap-x-1 rounded-full p-1 px-2 text-xs shadow ">
          <Menu withArrow withinPortal>
            <Menu.Target>
              <div className=" flex items-center">
                <Burger opened={false} size="sm" />
                <CgProfile size={24} />
              </div>
            </Menu.Target>
            <Menu.Dropdown className=" z-50">
              <Link href="/">
                <NavLink icon={<UserButton />} />
              </Link>
              <Link href="/listings/new">
                <NavLink label="Add Listing" icon={<MdOutlineAddHomeWork size={20} />} />
              </Link>
              <Link href="/">
                <NavLink label="My Listings" icon={<BsHouseCheck size={20} />} />
              </Link>
              <Link href="/">
                <NavLink label="My Bookings" icon={<BsHouseHeart size={20} />} />
              </Link>
              <SignOutButton>
                <NavLink label="Logout" icon={<BiLogOut size={20} />} />
              </SignOutButton>
            </Menu.Dropdown>
          </Menu>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
