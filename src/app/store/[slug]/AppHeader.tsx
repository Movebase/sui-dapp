import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import appIcon from "../../asset/app-logo.svg";

const AppHeader = () => {
  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
        className="flex-col mb:flex-row gap-3 mb:gap-0 items-start mb:items-center"
      >
        <Box className="flex gap-3 items-center ">
          <Image src={appIcon.src} alt="" width={60} height={60} />
          <Stack spacing={1}>
            <Typography className="text-grey-900">Ankr</Typography>
            <Typography className="text-grey-300">
              Web 3.0 Infrastructure Providers
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          className="wallet rounded-2xl w-full mb:w-auto"
        >
          Open app
        </Button>
      </Stack>
      <Typography className="text-justify">
        Ankr is a Web 3.0 infrastructure provider that offers a globally
        distributed network of nodes for multi-chain access across 40+
        blockchains. It makes accessing Web 3.0 easy by providing distributed,
        multi-cloud blockchain infrastructure for one-click node deployment and
        management, as well as instant API access to major blockchains and DeFi
        protocols for developers.
      </Typography>
    </Stack>
  );
};

export default AppHeader;
