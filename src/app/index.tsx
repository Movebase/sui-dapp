"use client";

import { authProvider } from "@providers/auth-provider";
import { CanAccess, Refine, usePermissions } from "@refinedev/core";
import { RefineKbar } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import "../index.css";
import { dataProvider } from "../providers/data-provider";
import { useNotificationProvider } from "../providers/noti-provider";
import { categories } from "./categories";
import { dapps } from "./dapps";
import { users } from "./users";
import accessControlProvider from "../providers/access-control-provider/accessControlProvider";
import { ErrorComponent } from "../components/common/Error";
import { ThemedLayout } from "../components/themed-layout";
import { UserRole } from "../enum";

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
        accessControlProvider={accessControlProvider}
        authProvider={authProvider}
        resources={[
          {
            ...dapps,
          },
          { ...categories },
          { ...users },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
          projectId: "3QJ1gO-1UARsp-1YvuEL",
        }}
      >
        {/* <CanAccess
          fallback={
            <ThemedLayout>
              <ErrorComponent />
            </ThemedLayout>
          }
        > */}
        {children}
        {/* </CanAccess> */}
        <RefineKbar />
      </Refine>
    </QueryClientProvider>
  );
};

export default App;
