import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Chip,
} from "@mui/material";
import React from "react";
import Carousel from "../../../components/common/Carousel";

const CategorySelect = ({
  filter,
  setFilter,
  flattenCategories,
}: {
  filter: any;
  setFilter: any;
  flattenCategories: any;
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFilter((prev: any) => ({
      ...prev,
      category: event.target.value as string,
    }));
  };

  return (
    <Box className="mb:col-span-2 md:col-span-1  mb:px-6 mb:pr-6 mb:pl-0">
      <FormControl className="hidden mb:block w-full">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter.category}
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
            "&.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
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
          {flattenCategories?.map((item: any, index: number) => {
            return (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box className=" mb:hidden flex gap-2 overflow-auto hidden-scrollbar">
        <Chip
          label={"All"}
          className={`${
            filter.category === "All" ? "wallet text-primary-contrastText" : ""
          }`}
          onClick={() =>
            setFilter((prev: any) => ({ ...prev, category: "All" }))
          }
          sx={{
            minWidth: "91px",
            fontSize: "16px",
            py: "20px",
            borderRadius: "26px",
          }}
        />
        {flattenCategories?.map((item: any, index: number) => {
          return (
            <Chip
              label={item.name}
              key={index}
              sx={{
                // minWidth: "91px",
                // width: "100%",
                fontSize: "16px",
                py: "20px",
                px: "10px",
                borderRadius: "26px",
              }}
              onClick={() =>
                setFilter((prev: any) => ({ ...prev, category: item.id }))
              }
              className={` ${
                filter.category === item.id
                  ? "wallet text-primary-contrastText"
                  : ""
              }`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategorySelect;
