"use client";

import { Typography } from "@mui/material";
import { Authenticated } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/mui";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <ErrorComponent />
    </Suspense>
  );
}
