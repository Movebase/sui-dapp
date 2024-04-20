import { AppDetail } from "@app/store/[slug]/AppDetail";
import { Box, Typography } from "@mui/material";
import AppCard from "./AppCard";
interface CategoryCardProps {
  title?: string;
  id?: string;
  apps?: AppDetail[];
}
const CategoryCard = (props: CategoryCardProps) => {
  const { title, id, apps } = props;
  const filterApps = apps?.filter((app) => app?.category.id === id) ?? [];

  return (
    <div>
      {filterApps?.length > 0 && (
        <div>
          <Box className="flex items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <Typography className="wallet-text hover:cursor-pointer">
              See all
            </Typography>
          </Box>
          <Box className="grid grid-cols-3 gap-x-2 gap-y-4 py-5 smb:grid-cols-4 smb:gap-4">
            {filterApps.map((item: any) => {
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
