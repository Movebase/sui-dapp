import { ColorModeContextProvider } from "@contexts/color-mode";
import { RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider } from "@refinedev/mui";
import { Metadata } from "next";
import Script from "next/script";
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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2VJRHXWD1N"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2VJRHXWD1N');`}
      </Script>
    </html>
  );
}
