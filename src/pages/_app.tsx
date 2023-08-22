import { api } from "@/utils/api";
import "@/styles/globals.css";
import { type AppProps } from "next/app";
import Head from "next/head";
import { type ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ClerkProvider } from "@clerk/nextjs";
import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";

function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>Qwangu</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#e11d48",
            },
          }}
          {...pageProps}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
              primaryColor: "qwangu",
              primaryShade: 6,
              colors: {
                qwangu: ["#fff1f2", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"],
                dark: ["#d5d7e0", "#acaebf", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#2b2c3d", "#1d1e30", "#0c0d21", "#01010a"],
              },
              loader: "bars",
            }}
          >
            <ModalsProvider>
              <Notifications />
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ModalsProvider>
          </MantineProvider>
        </ClerkProvider>
      </ColorSchemeProvider>
    </>
  );
}
export default api.withTRPC(App);
