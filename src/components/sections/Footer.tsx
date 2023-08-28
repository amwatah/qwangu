import Link from "next/link";
import { FaTwitter, FaGithub, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <div className=" container mx-auto flex flex-col items-center gap-y-2 py-8 sm:flex-row sm:justify-between ">
      <Link href="/" className=" text-xl font-bold">
        Qwangu
      </Link>
      <p className="">
        <span>
          Inspiration from{" "}
          <Link href="https://qwarqo.com" className=" font-bold underline">
            Qwarqo
          </Link>
        </span>
        {" , "}
        <span>
          crafted by{" "}
          <Link className=" font-bold underline" href="https://github.com/amwatah">
            Amwatah
          </Link>
        </span>
      </p>
      <div className=" flex items-center gap-x-2">
        <Link href="https://twitter.com/_Amwatah_">
          <FaTwitter />
        </Link>
        <Link href="https://github.com/amwatah">
          <FaGithub />
        </Link>
        <Link href="tel:+254743886199">
          <FaPhone />
        </Link>
      </div>
    </div>
  );
}
