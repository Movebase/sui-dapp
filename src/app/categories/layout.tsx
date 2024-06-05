"use client";
import { ThemedLayout } from "@components/themed-layout";
import { Authenticated, CanAccess } from "@refinedev/core";
import React from "react";
import { ErrorComponent } from "../../components/common/Error";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Authenticated key="categories">
      <ThemedLayout>{children}</ThemedLayout>;
    </Authenticated>
  );
}
