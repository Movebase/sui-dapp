import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import CustomImage from "../../../components/common/Image";
import { AppDetail } from "./AppDetail";

const AppHeader = ({ data }: { data: AppDetail | undefined }) => {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", mb: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "start", mb: "center" }}
        spacing={{
          xs: "12px",
          mb: "20px",
        }}
      >
        <Box className="flex items-center gap-3 ">
          <CustomImage
            src={data?.icon}
            className="flex h-[70px] w-[70px] items-center justify-center rounded-xl object-contain"
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
        <Link
          className="wallet flex w-full min-w-[100px] items-center justify-center rounded-2xl py-2 font-semibold text-primary-contrastText mb:w-fit "
          href={data?.url as string}
        >
          Open App
        </Link>
      </Stack>
      <Typography className="text-justify">{data?.description}</Typography>
    </Stack>
  );
};

export default AppHeader;
