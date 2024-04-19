import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDapps } from "../../providers/api/dappStore";
import AppCard from "./AppCard";
interface CategoryCardProps {
  title?: string;
  id?: string;
  filter?: any;
}
const CategoryCard = (props: CategoryCardProps) => {
  const { title, id, filter } = props;
  const { data } = useQuery({
    queryKey: ["category", title, filter],
    queryFn: () => {
      return getDapps({
        page: 1,
        limit: 8,
        offset: 0,
        filter: { category: id, name: filter?.name },
      });
    },
  });

  return (
    <div>
      {data?.data?.length > 0 && (
        <div>
          <Box className="flex items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <Typography className="hover:cursor-pointer wallet-text">
              See all
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 smb:grid-cols-4 gap-y-4 gap-x-2 smb:gap-4 py-5">
            {data?.data?.map((item: any) => {
              return (
                <AppCard key={item.id} {...item} href={`/store/${item?.id}`} />
              );
            })}
          </Box>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
