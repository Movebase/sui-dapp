import React from "react";
import Card from "./Card";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import twMerge from "../../helper/twMerge";
import CustomImage from "./Image";
import { truncate } from "lodash";

interface AppCardProps {
  name?: string;
  description?: string;
  icon: string;
  href: Url;
  className?: string;
}
const AppCard = ({
  name,
  description,
  icon,
  href,
  className,
}: AppCardProps) => {
  return (
    <Link href={href} className={twMerge` ${className}`}>
      <Card
        className="hidden h-24 min-w-[180px] items-center justify-center gap-3 p-0 mb:flex mb:justify-start mb:p-2 lg:p-4 lg:py-3"
        sx={{
          ":hover": {
            boxShadow: "0px 4px 30px 0px rgba(4, 6, 15, 0.1)",
          },
        }}
      >
        <CustomImage
          src={icon}
          alt=""
          width={50}
          height={50}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-xl object-contain"
        />
        <Stack spacing={1} className="hidden mb:block">
          <Typography className="text-grey-900 ">{name}</Typography>
          <Typography className="h-6 overflow-hidden text-ellipsis text-grey-300">
            {truncate(description, { length: 30 })}
          </Typography>
        </Stack>
      </Card>
      <Box className="flex flex-col  items-center justify-center gap-2 mb:hidden">
        <CustomImage
          src={icon}
          alt=""
          width={70}
          height={70}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-xl object-contain"
        />
        <Typography className="text-[14px] text-grey-900 ">{name}</Typography>
      </Box>
    </Link>
  );
};

export default AppCard;
