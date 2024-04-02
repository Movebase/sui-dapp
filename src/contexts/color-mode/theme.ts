import type { Theme, ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import type { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    violet?: PaletteOptions["primary"];
  }
  interface PaletteColorOptions {
    walletStart?: string;
    walletEnd?: string;
    main?: string;
    light?: string;
    dark?: string;
    contrastText?: string;
  }
}
const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#67be23",
    contrastText: "#fff",
  },
  secondary: {
    main: "#2A132E",
    contrastText: "#fff",
  },
  background: {
    default: "#212121",
    paper: "#242424",
  },
  success: {
    main: "#67be23",
    contrastText: "#fff",
  },

  error: {
    main: "#ee2a1e",
    contrastText: "#fff",
  },
  warning: {
    main: "#fa8c16",
    contrastText: "#fff",
  },
  info: {
    main: "#1890ff",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
  text: {
    primary: "#fff",
    secondary: "rgba(255,255,255,0.7)",
    disabled: "#d1d1d1",
  },
};
const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#67be23",
    light: "#67be93",
    dark: "#67ae00",
    walletStart: "#FD368F",
    walletEnd: "#F8A745",
    contrastText: "#fff",
  },
  grey: {
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
    main: "#2A132E",
    contrastText: "#fff",
  },
  background: {
    default: "#f0f0f0",
    paper: "#ffffff",
  },
  success: {
    main: "#67ce23",
    contrastText: "#fff",
  },
  error: {
    main: "#fa541c",
    contrastText: "#fff",
  },
  warning: {
    main: "#fa8c16",
    contrastText: "#fff",
  },
  info: {
    main: "#0b82f0",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
  text: {
    primary: "#626262",
    secondary: "#9f9f9f",
    disabled: "#c1c1c1",
  },
};

const commonThemeProperties: ThemeOptions = {
  shape: {
    borderRadius: 6,
  },
  typography: {
    ...typography,
  },
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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025))",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
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

export { LightTheme, DarkTheme, lightPalette };
