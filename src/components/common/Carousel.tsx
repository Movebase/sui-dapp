import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import CarouselBase, { CarouselProps } from "react-multi-carousel";
interface MyCarouselProps extends CarouselProps {
  children: React.ReactNode;
}
const defaultResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Carousel = (props: MyCarouselProps) => {
  const { children, responsive = defaultResponsive, ...rest } = props;
  return (
    <CarouselBase
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable={true}
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      partialVisible
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={true}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={true}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      responsive={responsive}
      customDot={<CustomDot />}
      customLeftArrow={
        <NavArrowLeft
          className=" bg-error-main text-error-main"
          width={20}
          height={20}
        />
      }
      customRightArrow={
        <NavArrowRight
          className=" bg-error-main text-error-main"
          width={20}
          height={20}
        />
      }
      {...rest}
    >
      {children}
    </CarouselBase>
  );
};

export default Carousel;

const CustomDot = (props: any) => {
  const { onClick, active } = props;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <button
      className={`${
        active ? "bg-grey-300" : "bg-grey-100"
      } mx-[2px] h-[10px] w-[10px] rounded-full `}
      onClick={() => onClick()}
    ></button>
  );
};
