import { ThemedLayout } from "@components/themed-layout";
import { redirect } from "next/navigation";
import React from "react";
import { checkAuth } from "../../helper/checkAuth";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = checkAuth();

  if (!data?.authenticated) {
    return redirect(data?.redirectTo ?? "/login");
  }
  return <ThemedLayout>{children}</ThemedLayout>;
}
