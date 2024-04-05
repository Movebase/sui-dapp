"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
// import { cookies } from "next/headers";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import "../index.css";
import { users } from "./users";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useNotificationProvider } from "@refinedev/mui";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 5000,
    },
  },
});
const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        notificationProvider={useNotificationProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "dashboard",
            list: "/dashboard",
            create: "/dashboard/create",
          },
          {
            name: "categories",
            list: "/categories",
            create: "/categories/create",
            edit: "/categories/edit/:id",
            show: "/categories/show/:id",
          },
          { ...users },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
          projectId: "3QJ1gO-1UARsp-1YvuEL",
        }}
      >
        {children}
        <RefineKbar />
      </Refine>
    </QueryClientProvider>
  );
};

export default App;
