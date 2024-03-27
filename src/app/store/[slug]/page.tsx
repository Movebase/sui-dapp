"use client";
import Swiper from "../../../components/common/Swiper";
import background from "../../asset/background.png";
import AppHeader from "./AppHeader";
import { useAppSelector } from "../../../hook/redux";
import { storeSelector } from "../../../redux/slices/store";
import { useGetBillQuery } from "../../../redux/api";

const AppDetail = ({ params }: { params: { slug: string } }) => {
  const store = useAppSelector(storeSelector);
  const { data } = useGetBillQuery(undefined);
  // console.log(data);
  return (
    <div>
      <AppHeader />
      <Swiper>
        {[...new Array(5)].map((item, index) => {
          return (
            <swiper-slide key={index} className="m-4">
              <img src={background.src} alt="" className="object-contain" />
              item {index}
            </swiper-slide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AppDetail;
