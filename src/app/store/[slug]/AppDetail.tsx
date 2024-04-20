"use client";
import { useQuery } from "@tanstack/react-query";
import { getAppDetail } from "../../../providers/api/dappStore";
import AppHeader from "./AppHeader";
export interface AppDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  shortDescription: string;
  description: string;
  url: string;
  videoThumbnail: any;
  icon: string;
  rate: any;
  usage: number;
  publishedAt: any;
  verifiedAt: any;
  deleteAt: any;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}
const AppDetail = ({ id }: { id: string }) => {
  const { data, isFetching } = useQuery<AppDetail>({
    queryKey: ["app", id],
    queryFn: () => getAppDetail(id),
  });

  return (
    <div className="flex flex-col gap-3">
      {data && <AppHeader data={data} />}
      {/* <Typography variant="h6" className="text-grey-900">
        Team
      </Typography>
      <Box className="grid grid-cols-1 mb:grid-cols-2 md:grid-cols-3 gap-5">
        {[...new Array(5)].map((_, i) => (
          <MemberCard key={i} />
        ))}
      </Box> */}
    </div>
  );
};

export default AppDetail;
