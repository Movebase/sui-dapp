"use client";
import { Box, Typography } from "@mui/material";
import MemberCard from "../../../components/common/MemberCard";
import AppHeader from "./AppHeader";

const AppDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="flex flex-col gap-3">
      <AppHeader />
      <Typography variant="h6" className="text-grey-900">
        Team
      </Typography>
      <Box className="grid grid-cols-1 mb:grid-cols-2 md:grid-cols-3 gap-5">
        {[...new Array(5)].map((_, i) => (
          <MemberCard key={i} />
        ))}
      </Box>
    </div>
  );
};

export default AppDetail;
