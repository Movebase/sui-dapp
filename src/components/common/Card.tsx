import { Box, BoxProps } from "@mui/material";

export interface CardProps extends BoxProps {}

const Card = (props: CardProps) => {
  return (
    <Box
      {...props}
      component="section"
      sx={{
        backgroundColor: "background.paper",
        boxShadow: "0px 4px 20px 0px rgba(150, 150, 150, 0.10)",
        borderRadius: "12px",
        ...props.sx,
      }}
      className={props.className}
    />
  );
};

export default Card;
