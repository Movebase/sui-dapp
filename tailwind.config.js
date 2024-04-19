/** @type {import('tailwindcss').Config} */
import { lightPalette } from "./src/contexts/color-mode/theme.ts";
import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...lightPalette,
    },
    screens: {
      smb: "376px",
      mb: "426px",
      ...defaultTheme.screens,
    },

    extend: {},
  },
  plugins: [],
};
