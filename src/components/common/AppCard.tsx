import React from "react";
import Card from "./Card";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import twMerge from "../../helper/twMerge";
import CustomImage from "./Image";

interface AppCardProps {
  title: string;
  description: string;
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
        className="flex gap-3  items-center p-4 py-3"
        sx={{
          ":hover": {
            boxShadow: "0px 4px 30px 0px rgba(4, 6, 15, 0.1)",
          },
        }}
      >
        <CustomImage
          src={src}
          alt=""
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
        <Stack spacing={1}>
          <Typography className="text-grey-900">{title}</Typography>
          <Typography className="text-grey-300">{description}</Typography>
        </Stack>
      </Card>
    </Link>
  );
};

export default AppCard;
