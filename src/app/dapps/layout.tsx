import { ThemedLayout } from "@components/themed-layout";
import { Authenticated } from "@refinedev/core";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <Authenticated key="dapps">
      <ThemedLayout>{children}</ThemedLayout>;
    </Authenticated>
  );
}
