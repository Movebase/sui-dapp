/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss";
import { lightPalette } from "./src/contexts/color-mode/theme.ts";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...lightPalette,
    },
    screens: {
      mb: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {},
  },
  plugins: [],
};
