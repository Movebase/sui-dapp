import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";

register();

const Swiper = ({ children }: any) => {
  const swiperElRef = useRef<any>(null);

  useEffect(() => {
    const swiperContainer = swiperElRef.current;
    const params = {
      modules: [Navigation, Pagination],
      loop: true,
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            // background-color: white;
            // padding: 8px 16px;
            // border-radius: 100%;
            // border: 2px solid black;
            // color: red;
          }
          .swiper-pagination-bullet{
            // width: 40px;
            // height: 40px;
            // background-color: red;
          }
      `,
      ],
      injectStylesUrls: [
        "path/to/navigation-element.min.css",
        "path/to/pagination-element.min.css",
      ],
    };

    Object.assign(swiperContainer as any, params);
    swiperContainer?.initialize();
  }, []);

  return (
    <swiper-container ref={swiperElRef} slides-per-view="1" init="false">
      {children}
    </swiper-container>
  );
};

export default Swiper;
