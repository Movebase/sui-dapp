"use client";
import { Typography } from "@mui/material";
import CategoryCard from "../../components/common/CategoryCard";
import { useRouter } from "next/navigation";

const Store = () => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <Typography>Store</Typography>
      <CategoryCard title="Category">
        {[...new Array(5)].map((item, index) => {
          return (
            <div key={index} onClick={() => router.push(`/store/${index}`)}>
              <img src="" alt="" className="w-40 h-40" />
              item {index}
            </div>
          );
        })}
      </CategoryCard>
    </div>
  );
};

export default Store;

// export const metadata: Metadata = {
//   title: "Dapp ",
// };
