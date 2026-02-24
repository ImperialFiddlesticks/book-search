import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="details" />
          <Stack.Screen name="searchResults" />
          <Stack.Screen name="favoritesPage" />
          <Stack.Screen name="scanner" options={{ presentation: "modal" }} />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
