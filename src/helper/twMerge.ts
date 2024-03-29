import React from "react";
import { twMerge as baseTwMerge } from "tailwind-merge";

const twMerge = (
  classNames: TemplateStringsArray,
  ...rest: (string | number | undefined)[]
) => {
  const classes = classNames.join(" ") + " " + rest.join(" ");
  return baseTwMerge(classes);
};

export default twMerge;
