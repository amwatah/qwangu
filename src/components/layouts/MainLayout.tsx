import React, { type ReactNode } from "react";
import Header from "../sections/Header";
import LeftDrawer from "../sections/LeftDrawer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className=" w-full overflow-clip">
      <div className=" sticky top-0 z-50 h-[8vh] w-full">
        <Header />
      </div>
      <LeftDrawer />

      <section className=" z-0 w-full px-2">{children}</section>
    </main>
  );
}
