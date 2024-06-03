import { ThemedLayout } from "@components/themed-layout";
import { Authenticated } from "@refinedev/core";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "New Title",
};
export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <Authenticated key="users">
      <ThemedLayout>{children}</ThemedLayout>;
    </Authenticated>
  );
}
