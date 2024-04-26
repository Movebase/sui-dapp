import { Box, BoxProps } from "@mui/material";
import twMerge from "../../helper/twMerge";

export interface CardProps extends BoxProps {}

const Card = (props: CardProps) => {
  return (
    <Box
      {...props}
      component="section"
      sx={{
        boxShadow: "0px 4px 20px 0px rgba(150, 150, 150, 0.10)",
        borderRadius: "12px",
        ...props.sx,
      }}
      className={twMerge`bg-background-paper ${props.className}`}
    />
  );
};

export default Card;
