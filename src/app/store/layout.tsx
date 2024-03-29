import { Container } from "@mui/material";
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
