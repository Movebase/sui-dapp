"use client";

import { Typography } from "@mui/material";
import { Authenticated, useIsAuthenticated } from "@refinedev/core";
import { Suspense } from "react";
import { ErrorComponent } from "../components/common/Error";
import { ThemedLayout } from "../components/themed-layout";
import Layout from "./store/layout";

export default function NotFound() {
  const { data } = useIsAuthenticated();

  return (
    <Suspense>
      {data?.authenticated ? (
        <ThemedLayout>
          <ErrorComponent />
        </ThemedLayout>
      ) : (
        <Layout>
          <ErrorComponent className="bg-background-paper" />
        </Layout>
      )}
    </Suspense>
  );
}
