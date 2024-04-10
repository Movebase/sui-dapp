"use client";

import { useIsAuthenticated } from "@refinedev/core";
import { Suspense } from "react";
import { ErrorComponent } from "../components/common/Error";
import { ThemedLayout } from "../components/themed-layout";
import CustomLayout from "./store/layout";

export default function NotFound() {
  const { data } = useIsAuthenticated();

  return (
    <Suspense>
      {data?.authenticated ? (
        <ThemedLayout>
          <ErrorComponent />
        </ThemedLayout>
      ) : (
        <CustomLayout>
          <ErrorComponent className="bg-background-paper" />
        </CustomLayout>
      )}
    </Suspense>
  );
}
