import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";
import { type ReactNode } from "react";
import NavBar from "../sections/NavBar";
import Footer from "../sections/Footer";

interface AppLayoutProps {
  children: ReactNode;
}
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Head>
        <title>Qwangu</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          colors: {
            qwangu: ["#fff1f2", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"],
            dark: ["#d5d7e0", "#acaebf", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#2b2c3d", "#1d1e30", "#0c0d21", "#01010a"],
          },
          primaryColor: "qwangu",
          primaryShade: 5,
        }}
      >
        <ModalsProvider>
          <Notifications />
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
