import { ThemedLayout } from "@components/themed-layout";
import { Container } from "@mui/material";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import CustomLayout from "../../components/common/Layout";

// export const metadata: Metadata = {
//   title: "New Title",
// };
export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <CustomLayout>
      <Container className="mt-10">{children}</Container>;
    </CustomLayout>
  );
}
