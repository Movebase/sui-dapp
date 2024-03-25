import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const AppHeader = () => {
  return (
    <Stack
      direction={"row"}
      spacing={2}
      width={"100%"}
      justifyContent="between"
      alignItems="center"
    >
      <Box>
        <Box>
          <Typography variant="h2">App name</Typography>
          <Typography variant="h5">Company name</Typography>
          <Typography variant="h5">App type</Typography>
          <Stack
            direction="row"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                className="border-primary-main"
              />
            }
            spacing={2}
          >
            <Box>Box 1</Box>
            <Box>Box 2</Box>
            <Box>Box 3</Box>
          </Stack>
        </Box>
      </Box>
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
    </Stack>
  );
};

export default AppHeader;
