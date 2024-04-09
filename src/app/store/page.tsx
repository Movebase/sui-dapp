"use client";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AppCard from "../../components/common/AppCard";
import SearchInput from "../../components/common/SearchInput";
import { getCategories, getDapps } from "../../providers/api/dappStore";

const LIMIT = 25;
const Store = () => {
  const [category, setCategory] = useState("All");
  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<any>({
    initialPageParam: 1,
    queryKey: ["store", category],
    queryFn: ({ pageParam = 1 }) => {
      return getDapps({
        page: pageParam,
        limit: LIMIT,
        offset: 0,
        filters: [
          {
            field: "category",
            value: category,
          },
        ],
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < LIMIT) {
        return null;
      }

      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
  const {
    data: categories,
    refetch: refetchCategories,
    fetchNextPage: fetchNextPageCategories,
    hasNextPage: hasNextPageCategories,
  } = useInfiniteQuery<any>({
    initialPageParam: 1,
    queryKey: ["categories"],
    queryFn: ({ pageParam = 1 }) => {
      return getCategories({
        page: pageParam,
        limit: LIMIT,
        offset: 0,
      });
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.length < LIMIT) {
        return null;
      }

      return pages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
  const flattenApps = data?.pages?.flatMap?.((item) => item?.data);
  const flattenCategories = categories?.pages?.flatMap?.((item) => item?.data);
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

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
      <Box className="w-full grid grid-cols-1 mb:grid-cols-6 md:grid-cols-4 gap-3 mb:gap-6">
        <SearchInput
          placeholder="Search"
          className="mb:col-span-4 md:col-span-3"
        />
        <FormControl className="mb:col-span-2 md:col-span-1">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
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

              // ":hover": {
              //   cursor: "pointer",
              // },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-input": {
                // width: "auto",
                color: "primary.contrastText",
                display: "flex",
                justifyContent: "center",
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
            <MenuItem value="All">All</MenuItem>
            {flattenCategories?.map((item, index) => {
              return (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <Suspense fallback={<Loading />}> */}
        <div className="col-span-1 mb:col-span-6 md:col-span-4 gap-2 overflow-y-auto">
          <InfiniteScroll
            className="grid grid-cols-1 mb:grid-cols-6 md:grid-cols-3 gap-3 mb:gap-6 p-6"
            hasMore={hasNextPage ?? false}
            dataLength={flattenApps?.length ?? 0}
            next={fetchNextPage}
            loader={"Loading..."}
            endMessage={""}
            height={"auto"}
          >
            {flattenApps?.map((item, index) => {
              return (
                <AppCard
                  key={index}
                  description={item.description}
                  title={item.name}
                  src={item.icon}
                  href={`/store/${item.id}`}
                  className="mb:col-span-3 md:col-span-1 "
                />
              );
            })}
          </InfiniteScroll>
        </div>
        {/* </Suspense> */}
      </Box>
    </div>
  );
};

export default Store;

// export const metadata: Metadata = {
//   title: "Dapp ",
// };
