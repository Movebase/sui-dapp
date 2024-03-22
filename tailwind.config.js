/** @type {import('tailwindcss').Config} */
import { lightPalette } from "./src/contexts/color-mode/theme.ts";
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...lightPalette,
    },
    extend: {},
  },
  plugins: [],
};
