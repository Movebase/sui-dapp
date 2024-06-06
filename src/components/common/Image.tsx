import Image from "next/image";
import React from "react";
import { apiUrl } from "../../providers/api";
interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
const CustomImage = (params: CustomImageProps) => {
  const { src, height = 60, width = 60, alt = "logo", className } = params;
  return (
    <Image
      src={`${apiUrl}/storage/dapps${src}`}
      alt={alt}
      width={width as number}
      height={height as number}
      className={className}
    />
  );
};

export default CustomImage;
