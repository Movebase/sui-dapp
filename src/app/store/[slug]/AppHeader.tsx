import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import ankr from "../../asset/ankr.svg";
import { AppDetail } from "./AppDetail";
import CustomImage from "../../../components/common/Image";

const AppHeader = ({ data }: { data: AppDetail | undefined }) => {
  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
        className="flex-col mb:flex-row gap-3 mb:gap-5 items-start mb:items-center"
      >
        <Box className="flex gap-3 items-center ">
          <CustomImage
            src={data?.icon}
            className="rounded-xl flex h-[70px] object-contain items-center justify-center"
          />
          <Stack>
            <Typography className="text-grey-900" variant="h6">
              {data?.name}
            </Typography>
            <Typography className="text-grey-300">
              {data?.shortDescription}
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          className="wallet min-w-[100px] rounded-2xl w-full mb:w-auto"
        >
          Open app
        </Button>
      </Stack>
      <Typography className="text-justify">{data?.description}</Typography>
    </Stack>
  );
};

export default AppHeader;
