import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider, ThemeProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import {
  LibreBaskerville_400Regular,
  LibreBaskerville_700Bold,
} from "@expo-google-fonts/libre-baskerville";
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from "@expo-google-fonts/source-sans-3";
import { CombinedLightTheme } from "../constants/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider
        theme={CombinedLightTheme}
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <ThemeProvider theme={CombinedLightTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: CombinedLightTheme.colors.background,
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="details" />
            <Stack.Screen name="searchResults" />
            <Stack.Screen name="profilePage" />
            <Stack.Screen name="collectionsPage" />
            <Stack.Screen name="collection/[title]" />
            <Stack.Screen name="scanner" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
