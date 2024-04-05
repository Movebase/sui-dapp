"use client";

import { Header } from "@components/header";
import { ThemedLayoutV2 } from "@refinedev/mui";
import React from "react";
import { ThemedSiderV2 } from "../sider";

export const ThemedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={() => <Header sticky />}
      Sider={() => <ThemedSiderV2 />}
    >
      {children}
    </ThemedLayoutV2>
  );
};
