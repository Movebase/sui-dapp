import type { PaletteOptions, ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    violet?: PaletteOptions["primary"];
  }
  interface ColorPartial {
    50: string;
  }
  interface PaletteColorOptions {
    main?: string;
    light?: string;
    dark?: string;
    contrastText?: string;
  }
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    smb: true;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    light: "#B8D2F5", // 100
    main: "#196FE0", // 500
    dark: "#124F9F", // 700
    contrastText: "#fff",
  },
  grey: {
    50: "#EAECF0",
    100: "#D6D9DF",
    200: "#ADB4C0",
    300: "#838FA0",
    400: "#5A6981",
    500: "#2C4364",
    600: "#27364E",
    700: "#1D283A",
    800: "#141B27",
    900: "#0A0D13",
  },
  secondary: {
    light: "#F0F1F2",
    main: "#8A8D93",
    dark: "#4D5056",
    contrastText: "#fff",
  },
  background: {
    default: "#f0f0f0",
    paper: "#ffffff",
  },
  success: {
    light: "#B0EDCC",
    main: "#00C65B",
    dark: "#008D41",
    contrastText: "#fff",
  },
  error: {
    light: "#FCCBCB",
    main: "#F65757",
    dark: "#AF3E3E",
    contrastText: "#fff",
  },
  warning: {
    light: "#FFDEC5",
    main: "#FF9443",
    dark: "#B56930",
    contrastText: "#fff",
  },
  info: {
    light: "#C5EEFB",
    main: "#45C8F1",
    dark: "#318EAB",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
  text: {
    primary: "#626262",
    secondary: "#9f9f9f",
    disabled: "#c1c1c1",
  },
};
const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    light: "#B8D2F5", // 100
    main: "#196FE0", // 500
    dark: "#124F9F", // 700
    contrastText: "#fff",
  },
  grey: {
    50: "#EAECF0",
    100: "#D6D9DF",
    200: "#ADB4C0",
    300: "#838FA0",
    400: "#5A6981",
    500: "#2C4364",
    600: "#27364E",
    700: "#1D283A",
    800: "#141B27",
    900: "#0A0D13",
  },
  secondary: {
    light: "#F0F1F2",
    main: "#8A8D93",
    dark: "#4D5056",
    contrastText: "#fff",
  },
  background: {
    default: "#f0f0f0",
    paper: "#ffffff",
  },
  success: {
    light: "#B0EDCC",
    main: "#00C65B",
    dark: "#008D41",
    contrastText: "#fff",
  },
  error: {
    light: "#FCCBCB",
    main: "#F65757",
    dark: "#AF3E3E",
    contrastText: "#fff",
  },
  warning: {
    light: "#FFDEC5",
    main: "#FF9443",
    dark: "#B56930",
    contrastText: "#fff",
  },
  info: {
    light: "#C5EEFB",
    main: "#45C8F1",
    dark: "#318EAB",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
  text: {
    primary: "#626262",
    secondary: "#9f9f9f",
    disabled: "#c1c1c1",
  },
};
const breakpoints = {
  values: {
    xs: 0,
    smb: 376,
    mb: 426,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const commonThemeProperties: ThemeOptions = {
  shape: {
    borderRadius: 6,
  },
  typography: {
    ...typography,
  },
  breakpoints,
};

const LightTheme = createTheme({
  ...commonThemeProperties,
  palette: lightPalette,

  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiButton-contained": {
            backgroundColor: lightPalette?.primary?.main,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          fontWeight: 800,
          lineHeight: "2rem",
        },
      },
    },
  },
});

const DarkTheme = createTheme({
  ...commonThemeProperties,
  palette: darkPalette,
  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: {
  //         backgroundImage:
  //           "linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025))",
  //       },
  //     },
  //   },
  //   MuiAppBar: {
  //     defaultProps: {
  //       color: "transparent",
  //     },
  //   },
  //   MuiTypography: {
  //     styleOverrides: {
  //       h5: {
  //         fontWeight: 800,
  //         lineHeight: "2rem",
  //       },
  //     },
  //   },
  // },
});

export { DarkTheme, LightTheme, lightPalette };
