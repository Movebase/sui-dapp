import { ThemedLayout } from "@components/themed-layout";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { checkAuth } from "../../helper/checkAuth";

export const metadata: Metadata = {
  title: "New Title",
};
export default async function Layout({ children }: React.PropsWithChildren) {
  return <ThemedLayout>{children}</ThemedLayout>;
}
