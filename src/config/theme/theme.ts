import { createTheme } from "@mui/material/styles";

export const customPalette = {
  primaryColor: "#001C46",
  secondaryColor: "#FC4A41",
  // Alerts color
  successColor: "#A3FEAC",
  infoColor: "#6FA4F2",
  errorColor: "#FF8D87",
  grayLightColor: "#F5F9FF",
  grayDarkColor: "#5E5E5E",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#001C46",
    },
    secondary: {
      main: "#FC4A41",
      dark: "#8B7E74",
      light: "#F1D3B3",
    },
    success: {
      main: "#93E087",
    },
    info: {
      main: "#87BBE0",
    },
    error: {
      main: "#D96262",
    },
    ...customPalette,
  },
});
