import { Button } from "@mantine/core";
import React from "react";

export default function HeroSection() {
  return (
    <section className="">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight  md:text-5xl xl:text-6xl">Payments tool for software companies</h1>
          <p className="mb-6 max-w-2xl font-light  md:text-lg lg:mb-8 lg:text-xl">
            From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.
          </p>
          <div className=" flex items-center gap-x-4">
            <Button>Get Started</Button>
            <Button variant="outline">Explore</Button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src="/images/qwarqo-banner.jpg" alt="mockup" />
        </div>
      </div>
    </section>
  );
}
