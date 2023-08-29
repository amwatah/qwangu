import { Burger, Button, Input, Menu, NavLink, Paper } from "@mantine/core";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { BsSearch, BsHouseCheck, BsHouseHeart } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { drawerOpenAtom, globalSearchValueAtom } from "@/stores";
import { useRouter } from "next/router";

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
  const [globalSearchValue, setGlobalSearchValue] = useAtom(globalSearchValueAtom);

  return (
    <Paper className="  fixed top-0 z-[1000] mx-auto flex w-full items-center justify-between gap-x-2 bg-opacity-100 p-2 px-4 shadow-2xl sm:p-4 sm:px-8">
      <div className=" flex flex-1 items-center">
        <Burger
          opened={drawerOpen}
          onClick={() => {
            setDrawerOpen(true);
          }}
          size="sm"
          className=" sm:hidden"
        />
        <Link href="/" className="  font-bold">
          <h2>Qwangu</h2>
        </Link>
      </div>
      <div className=" hidden h-full flex-[8] grow justify-center sm:flex">
        <Input
          value={globalSearchValue}
          onChange={(e) => setGlobalSearchValue(e.target.value)}
          placeholder="I'm searching for... "
          className=" hidden   w-3/4 sm:inline-flex"
          rightSection={
            <Button onClick={() => void router.push("/listings")} className=" rounded-full" color="blue">
              <BsSearch />
            </Button>
          }
          radius="xl"
        />
      </div>

      <div className=" flex flex-1  items-center justify-end gap-x-2 font-bold">
        <Link href="/listings" className="hidden rounded-full sm:inline-flex">
          Listings
        </Link>
        {user ? (
          <Link href="/listings/new" className=" hidden rounded-full sm:inline-flex">
            Add Listing
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Link href="/" className=" hidden rounded-full sm:inline-flex">
              Sign Up
            </Link>
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
            <Menu.Dropdown className=" z-[1001]">
              <Link href="/">
                <NavLink icon={<UserButton />} />
              </Link>
              <Link href="/listings/new">
                <NavLink label="Add Listing" icon={<MdOutlineAddHomeWork size={20} />} />
              </Link>
              <Link href="/">
                <NavLink label="My Listings" icon={<BsHouseCheck size={20} />} />
              </Link>
              <Link href="/bookings">
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
    </Paper>
  );
}
