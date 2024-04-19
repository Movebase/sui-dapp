"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { User } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "../../app/asset/logo.svg";
import name from "../../app/asset/name.svg";
import twMerge from "../../helper/twMerge";
import { ColorModeContext } from "../../contexts/color-mode";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const CustomLayout = (props: Props) => {
  const { className, children, ...rest } = props;

  return (
    <Box
      className={twMerge`min-h-screen bg-[#FBFCFD] mb:bg-background-paper ${className}`}
      {...rest}
    >
      <Box
        className="flex h-16 w-full flex-row items-center justify-between overflow-hidden bg-[#FBFCFD] mb:bg-background-paper px-6 py-3 text-center"
        sx={{
          boxShadow: {
            xs: "none",
            mb: "0px 4px 30px 0px rgba(4, 6, 15, 0.08)",
          },
        }}
      >
        <Link href={"/"} className="relative flex gap-2">
          <Image
            className="object-contain w-[35px] mb:w-[50px] "
            src={logo.src}
            alt="logo"
            width={50}
            height={50}
          />
          <Image
            className="object-contain w-[110px] mb:w-[150px]"
            src={name.src}
            alt="name"
            width={150}
            height={10}
          />
        </Link>

        {/* <Link href={"/login"} className="flex flex-row items-center">
          <Button
            variant="text"
            sx={{
              textTransform: "none",
              color: "text.primary",
            }}
            startIcon={
              <div className="flex items-center justify-center rounded-full bg-primary-lighter p-1">
                <User strokeWidth={1.5} strokeOpacity={0.8} />
              </div>
            }
          >
            Log in
          </Button>
        </Link> */}
      </Box>
      {children}
    </Box>
  );
};

export default CustomLayout;
