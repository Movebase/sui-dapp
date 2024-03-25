import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import React from "react";
import CarouselBase, { CarouselProps } from "react-multi-carousel";
interface MyCarouselProps extends CarouselProps {
  children: React.ReactNode;
}
const Carousel = (props: MyCarouselProps) => {
  const { children, responsive, ...rest } = props;
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
      showDots={false}
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
