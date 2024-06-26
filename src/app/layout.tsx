import { RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider } from "@refinedev/mui";
import { Metadata } from "next";
import { ColorModeContextProvider } from "@contexts/color-mode";
import React, { Suspense } from "react";
import "react-multi-carousel/lib/styles.css";
import App from ".";
import "../index.css";

export const metadata: Metadata = {
  title: "Dapp store",
  description: "Decentralized applications platform for SUI blockchain",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = typeof window !== "undefined" && localStorage.getItem("theme");
  const defaultMode = "light";

  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                <App>{children}</App>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
