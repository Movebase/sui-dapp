import { ThemedLayout } from "@components/themed-layout";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return <ThemedLayout>{children}</ThemedLayout>;
}
