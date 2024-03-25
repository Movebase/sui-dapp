"use client";
import { useParams } from "next/navigation";
import React from "react";
import AppHeader from "./AppHeader";
import Carousel from "../../../components/common/Carousel";
import background from "../../asset/background.png";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import Swiper from "../../../components/common/Swiper";
import { SwiperSlide } from "swiper/react";

const AppDetail = ({ params }: { params: { slug: string } }) => {
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
