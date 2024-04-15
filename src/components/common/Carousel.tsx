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
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
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
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      partialVisible
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={true}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      responsive={responsive}
      customLeftArrow={
        <NavArrowLeft
          className=" text-error-main bg-error-main"
          width={20}
          height={20}
        />
      }
      customRightArrow={
        <NavArrowRight
          className=" text-error-main bg-error-main"
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
