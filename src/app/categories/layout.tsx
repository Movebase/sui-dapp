import { ThemedLayout } from "@components/themed-layout";
import { Authenticated } from "@refinedev/core";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Authenticated key="categories">
      <ThemedLayout>{children}</ThemedLayout>;
    </Authenticated>
  );
}
