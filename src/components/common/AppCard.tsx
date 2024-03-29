import React from "react";
import Card from "./Card";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";
import appIcon from "../../app/asset/app-logo.svg";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

interface AppCardProps {
  title: string;
  description: string;
  src?: string;
  href: Url;
}
const AppCard = ({ title, description, src, href }: AppCardProps) => {
  return (
    <Link href={href}>
      <Card className="flex gap-3 items-center p-4 py-3">
        <Image
          src={appIcon.src}
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
