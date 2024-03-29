import React from "react";
import Card from "./Card";
import Image from "next/image";
import avatar from "../../app/asset/avatar.svg";
import { Stack, Typography } from "@mui/material";
const MemberCard = () => {
  return (
    <Card className="flex flex-col  border-[1px] border-grey-100 border-solid rounded-lg gap-3 items-center p-4 py-3">
      <Image
        src={avatar.src}
        alt=""
        width={50}
        height={50}
        className="w-[50px] h-[50px]"
      />
      <Stack spacing={1} alignItems={"center"}>
        <Typography className="text-grey-900">Chandler Song</Typography>
        <Typography className="text-grey-300">Co-Founder and CEO</Typography>
      </Stack>
    </Card>
  );
};

export default MemberCard;
