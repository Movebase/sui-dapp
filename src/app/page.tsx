"use client";

import { Suspense } from "react";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";

// export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 3600;
// export const dynamic = "force-static";
export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <NavigateToResource />
      </Authenticated>
    </Suspense>
  );
}
