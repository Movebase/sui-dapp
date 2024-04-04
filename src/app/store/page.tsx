"use client";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import AppCard from "../../components/common/AppCard";
import SearchInput from "../../components/common/SearchInput";
import banner from "../asset/banner.svg";
import ankr from "../asset/ankr.svg";
import bluefin from "../asset/bluefin.svg";
import euterpe from "../asset/euterpe.svg";
import movex from "../asset/movex.svg";
import rubic from "../asset/rubic.svg";
import solend from "../asset/solend.svg";
import volo from "../asset/volo.svg";

const Store = () => {
  const [age, setAge] = useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const fakeStore = [
    {
      title: "Ankr",
      description: "Web 3.0 Infrastructure Providers",
      src: ankr.src,
    },
    {
      title: "MovEX",
      description: "Web 3.0 Infrastructure Providers",

      src: movex.src,
    },
    {
      title: "Solend",
      description: "Web 3.0 Infrastructure Providers",
      src: solend.src,
    },
    {
      title: "Volo",
      description: "Web 3.0 Infrastructure Providers",
      src: volo.src,
    },
    {
      title: "Rubic",
      description: "Web 3.0 Infrastructure Providers",
      src: rubic.src,
    },
    {
      title: "Bluefin",
      description: "Web 3.0 Infrastructure Providers",
      src: bluefin.src,
    },
    {
      title: "Euterpe",
      description: "Web 3.0 Infrastructure Providers",
      src: euterpe.src,
    },
    {
      title: "Ankr",
      description: "Web 3.0 Infrastructure Providers",
      src: ankr.src,
    },
  ];
  return (
    <div className="flex flex-col items-center gap-3">
      {" "}
      {/* <Image
        src={banner.src}
        alt=""
        width={1000}
        height={370}
        className="rounded-lg"
      /> */}
      <Stack direction={"row"} spacing={3} alignItems={"center"}></Stack>
      <Box className="grid grid-cols-1 mb:grid-cols-6 md:grid-cols-3 gap-3 mb:gap-6">
        <SearchInput
          placeholder="Search"
          className="mb:col-span-4 md:col-span-2"
        />
        <FormControl className="mb:col-span-2 md:col-span-1">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
            className="wallet "
            // IconComponent={(props: any) => {
            //   const { className } = props;
            //   if (className.includes("MuiSelect-iconOpen")) {
            //     return <NavArrowUp className="text-primary-contrastText" />;
            //   } else {
            //     return <NavArrowDown className="text-primary-contrastText" />;
            //   }
            // }}
            sx={{
              borderRadius: "26px",
              height: "50px",
              bgcolor: "primary.wallet",
              // ":hover": {
              //   cursor: "pointer",
              // },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-input": {
                // width: "auto",
                color: "primary.contrastText",
              },
              "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                paddingRight: 0,
              },
              "&.MuiInputBase-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiSvgIcon-root": {
                position: "relative",
                right: 0,
                top: 0,
              },
            }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"defi"}>Defi</MenuItem>
            <MenuItem value={"game"}>Games</MenuItem>
          </Select>
        </FormControl>
        {fakeStore.map((item, index) => {
          return (
            <AppCard
              key={index}
              description={item.description}
              title={item.title}
              src={item.src}
              href={`/store/${index}`}
              className="mb:col-span-3 md:col-span-1"
            />
          );
        })}
      </Box>
    </div>
  );
};

export default Store;

// export const metadata: Metadata = {
//   title: "Dapp ",
// };
