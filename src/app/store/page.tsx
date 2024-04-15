"use client";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AppCard from "../../components/common/AppCard";
import SearchInput from "../../components/common/SearchInput";
import { getCategories, getDapps } from "../../providers/api/dappStore";
import Banner from "./common/Banner";
import CategorySelect from "./common/CategorySelect";

const LIMIT = 25;
const Store = () => {
  const [filter, setFilter] = useState({
    name: "",
    category: "All",
  });
  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<any>({
    initialPageParam: 1,
    queryKey: ["store", filter],
    queryFn: ({ pageParam = 1 }) => {
      return getDapps({
        page: pageParam,
        limit: LIMIT,
        offset: 0,
        filter: filter,
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

  useEffect(() => {
    typeof window !== "undefined" && localStorage.removeItem("theme");
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 ">
      <Banner />
      <Box className="w-full grid grid-cols-1 mb:grid-cols-6 md:grid-cols-4 gap-3 mb:gap-6">
        <SearchInput
          placeholder="Search"
          className="mb:col-span-4 md:col-span-3 px-6 mb:pl-6 mb:pr-0"
          onFilterChange={setFilter}
          defaultFilter={filter}
          filterFields={["name"]}
        />
        <CategorySelect
          filter={filter}
          setFilter={setFilter}
          flattenCategories={flattenCategories}
        />

        {/* <Suspense fallback={<Loading />}> */}
        <div className="col-span-1 mb:col-span-6 md:col-span-4 gap-2 overflow-y-auto">
          <InfiniteScroll
            className="grid grid-cols-3 mb:grid-cols-6 md:grid-cols-3 gap-7 mb:gap-6 p-6 pt-0"
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
                  description={item?.description}
                  title={item?.name}
                  src={item?.icon}
                  href={`/store/${item?.id}`}
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
