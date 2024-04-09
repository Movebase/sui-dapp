import { CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="grid h-screen place-content-center">
      <CircularProgress />
      <Typography>Loading...</Typography>
    </div>
  );
};

export default Loading;
