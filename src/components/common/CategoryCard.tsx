import { Box, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";
interface CategoryCardProps {
  title?: string;
  children: any;
}
const CategoryCard = (props: CategoryCardProps) => {
  const { title, children } = props;
  return (
    <div>
      <Box className="flex items-center justify-between">
        <Typography variant="h6">{title}</Typography>
        <Typography className="hover:cursor-pointer">See all</Typography>
      </Box>
      <Carousel
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CategoryCard;
