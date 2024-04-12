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
  title?: string;
  description?: string;
  src: string;
  href: Url;
  className?: string;
}
const AppCard = ({
  title,
  description,
  src,
  href,
  className,
}: AppCardProps) => {
  return (
    <Link href={href} className={twMerge` ${className}`}>
      <Card
        className="hidden mb:flex gap-3 h-24 items-center p-0 mb:p-4 mb:py-3 justify-center mb:justify-start"
        sx={{
          ":hover": {
            boxShadow: "0px 4px 30px 0px rgba(4, 6, 15, 0.1)",
          },
        }}
      >
        <CustomImage src={src} alt="" width={50} height={50} />
        <Stack spacing={1} className="hidden mb:block">
          <Typography className="text-grey-900">{title}</Typography>
          <Typography className="text-grey-300 overflow-hidden">
            {truncate(description, { length: 30 })}
          </Typography>
        </Stack>
      </Card>
      <Box className="flex flex-col gap-2 items-center justify-center mb:hidden">
        <CustomImage
          src={src}
          alt=""
          width={70}
          height={70}
          className="rounded-xl flex h-[70px] object-contain items-center justify-center"
        />
        <Typography className="text-grey-900">{title}</Typography>
      </Box>
    </Link>
  );
};

export default AppCard;
