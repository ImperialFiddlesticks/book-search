import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import {
  adaptNavigationTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

export const CombinedLightTheme = {
  ...PaperDefaultTheme,
  ...LightTheme,
  colors: {
    ...PaperDefaultTheme?.colors,
    ...LightTheme?.colors,
    primary: "rgba(0, 0, 0, 0.80)",
    secondary: "#D4895A",
    tertiary: "hsla(0, 0%, 0%, 0.15)",
    background: "#FEFFF3",
    header: "#00000000",
    surface: "hsla(0, 0%, 0%, 0.05)",
    onSurface: "#333333",
  },
  fonts: {
    ...PaperDefaultTheme?.fonts,
  },
};
