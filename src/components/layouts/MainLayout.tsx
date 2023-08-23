import React, { type ReactNode } from "react";
import Header from "../sections/Header";
import LeftDrawer from "../sections/LeftDrawer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className=" w-full overflow-x-clip">
      <Header />
      <LeftDrawer />
      <section className=" container z-0 mx-auto  px-2">{children}</section>
    </main>
  );
}
