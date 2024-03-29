"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar } from "@refinedev/kbar";
import { notificationProvider } from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
// import { cookies } from "next/headers";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import { Provider } from "react-redux";
import "../index.css";
import { store } from "../redux/store";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        notificationProvider={notificationProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "blog_posts",
            list: "/blog-posts",
            create: "/blog-posts/create",
            edit: "/blog-posts/edit/:id",
            show: "/blog-posts/show/:id",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "categories",
            list: "/categories",
            create: "/categories/create",
            edit: "/categories/edit/:id",
            show: "/categories/show/:id",
            // meta: {
            //   canDelete: true,
            // },
          },
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
    </Provider>
  );
};

export default App;
