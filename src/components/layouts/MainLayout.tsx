import React, { type ReactNode } from "react";
import Header from "../sections/Header";
import LeftDrawer from "../sections/LeftDrawer";
import Footer from "../sections/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className=" w-full overflow-x-clip">
      <Header />
      <LeftDrawer />
      <section className=" container z-0 mx-auto  min-h-screen px-2 pt-[10vh]">{children}</section>
      <Footer />
    </main>
  );
}
