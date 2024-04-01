/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss";
import { lightPalette } from "./src/contexts/color-mode/theme.ts";
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...lightPalette,
    },
    screens: {
      mb: "425px",
      ...defaultTheme.screens,
    },

    extend: {},
  },
  plugins: [],
};
