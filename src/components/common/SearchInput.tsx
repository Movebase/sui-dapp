import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import twMerge from "../../helper/twMerge";
import { debounce } from "lodash";
import { Search } from "iconoir-react";
interface SearchInputProps {
  defaultFilter?: Record<string, any>;
  onFilterChange?: (filter: any) => void;
  className?: string;
  filterFields: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
const SearchInput = (props: SearchInputProps) => {
  const {
    defaultFilter,
    onFilterChange,
    filterFields,
    className,
    label,
    placeholder,
    disabled,
  } = props;
  const [value, setValue] = useState("");
  const onChange = debounce((e: any) => {
    const value = e?.target?.value;
    const filter = { ...defaultFilter };
    filterFields.forEach(
      (field) => (filter[field] = value ? value : undefined)
    );
    onFilterChange?.(filter);
  }, 500);

  return (
    <div
      className={twMerge`flex h-full w-full flex-1 items-center ${className}`}
    >
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={value}
        size="small"
        fullWidth
        label={label}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        InputProps={{
          startAdornment: <Search className="mr-2" />,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "26px",
            height: "50px",
            bgcolor: {
              xs: "background.paper",
              mb: "grey.50",
            },
          },
        }}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchInput;
